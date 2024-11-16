<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // Create the order
        $order = new Order();
        $order->user_id = $user->id;
        $order->total_amount = $request->total_amount;
        $order->save();

        // Add order items
        foreach ($request->cart_items as $cartItemData) {
            $order->items()->create([
                'product_id' => $cartItemData['product_id'],
                'quantity' => $cartItemData['quantity'],
                'price' => $cartItemData['price'],
                'discount' => $cartItemData['discount'],
            ]);
        }

        // Clear the user's cart after placing the order
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Order placed successfully!',
            'order' => $order,
        ], 200);
    }
}
