<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming order data
        $request->validate([
            'cart_items' => 'required|array',
            'total_amount' => 'required|numeric',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Create the order
            $order = new Order();
            $order->user_id = $user->id;
            $order->total_amount = $request->total_amount;
            $order->save();

            // Add order items and update stock
            foreach ($request->cart_items as $cartItemData) {
                $product = Product::find($cartItemData['product_id']);

                // Check if product exists and has enough stock
                if ($product && $product->quantity >= $cartItemData['quantity']) {
                    // Decrement the stock
                    $product->decrement('quantity', $cartItemData['quantity']);

                    // Add item to the order
                    $order->items()->create([
                        'product_id' => $cartItemData['product_id'],
                        'quantity' => $cartItemData['quantity'],
                        'price' => $cartItemData['price'],
                        'discount' => $cartItemData['discount'],
                    ]);
                } else {
                    // If stock is insufficient, throw an error
                    throw new \Exception("Insufficient stock for product ID: " . $cartItemData['product_id']);
                }
            }

            // Clear the user's cart after placing the order
            Cart::where('user_id', $user->id)->delete();

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully!',
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();

            return response()->json([
                'message' => 'Error placing order: ' . $e->getMessage(),
            ], 500);
        }
    }
}
