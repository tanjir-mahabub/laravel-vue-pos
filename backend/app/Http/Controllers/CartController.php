<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
     public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($validated['product_id']);

        if ($product->stock_quantity < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

        $cartItem = $cart->items()->updateOrCreate(
            ['product_id' => $validated['product_id']],
            [
                'quantity' => $validated['quantity'],
                'price' => $product->price,
            ]
        );

        return response()->json(['message' => 'Item added to cart', 'item' => $cartItem]);
    }

    public function viewCart()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->first();
        return response()->json($cart);
    }

    public function removeItem($itemId)
    {
        $cartItem = CartItem::findOrFail($itemId);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    public function checkout()
    {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        foreach ($cart->items as $item) {
            if ($item->product->stock_quantity < $item->quantity) {
                return response()->json(['message' => "Insufficient stock for {$item->product->name}"], 400);
            }
        }

        // Reduce stock
        foreach ($cart->items as $item) {
            $item->product->decrement('stock_quantity', $item->quantity);
        }

        // Create order logic (to be implemented in Step 6)

        $cart->items()->delete();
        $cart->delete();

        return response()->json(['message' => 'Checkout completed successfully']);
    }


}
