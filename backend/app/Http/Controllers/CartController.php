<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
     // Add item to cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($request->product_id);

        if ($product->stock < $request->quantity) {
            return response()->json(['error' => 'Not enough stock available.'], 400);
        }

        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Item added to cart.']);
    }

    // View cart items
    public function viewCart()
    {
        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();
        return response()->json($cartItems);
    }

    // Remove item from cart
    public function removeFromCart($cartItemId)
    {
        $cartItem = Cart::where('id', $cartItemId)->where('user_id', Auth::id())->first();
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Item removed from cart.']);
        }
        return response()->json(['error' => 'Item not found in cart.'], 404);
    }


}
