<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
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

        $product = Product::findOrFail($validated['product_id']);


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

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        foreach ($cart->items as $item) {
            if ($item->product->stock_quantity < $item->quantity) {
                return response()->json(['message' => "Insufficient stock for {$item->product->name}"], 400);
            }
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $cart->items->sum(function ($item) {
                return $item->quantity * $item->price - ($item->discount ?? 0);
            }),
        ]);

        foreach ($cart->items as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'discount' => $item->discount,
            ]);

            $item->product->decrement('stock_quantity', $item->quantity);
        }

        $cart->items()->delete();
        $cart->delete();

        return response()->json(['message' => 'Checkout completed successfully', 'order' => $order]);
    }



}
