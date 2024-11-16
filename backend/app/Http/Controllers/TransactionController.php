<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function checkout(Request $request)
    {
        $cartItems = Cart::where('user_id', Auth::id())->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $totalAmount = 0;

        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);

            // Check stock
            if ($product->stock < $item->quantity) {
                return response()->json(['error' => 'Not enough stock for product ' . $product->name], 400);
            }

            // Update stock
            $product->stock -= $item->quantity;
            $product->save();

            // Calculate total
            $totalAmount += $product->price * $item->quantity;
        }

        // Create transaction
        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'total_amount' => $totalAmount,
        ]);

        // Clear the cart
        Cart::where('user_id', Auth::id())->delete();

        return response()->json([
            'message' => 'Transaction completed successfully',
            'transaction' => $transaction,
        ]);
    }
}
