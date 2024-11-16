<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function dateWiseReport(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $orders = Order::whereBetween('created_at', [$validated['start_date'], $validated['end_date']])
            ->with('items.product')
            ->get();

        $totalSales = $orders->sum('total_amount');

        return response()->json(['total_sales' => $totalSales, 'orders' => $orders]);
    }

    public function productWiseReport(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $products = Product::with(['orderItems' => function ($query) use ($validated) {
            $query->whereHas('order', function ($query) use ($validated) {
                $query->whereBetween('created_at', [$validated['start_date'], $validated['end_date']]);
            });
        }])->get();

        return response()->json(['products' => $products]);
    }

    public function stockReport()
    {
        $products = Product::all(['id', 'name', 'stock_quantity']);
        return response()->json(['stock' => $products]);
    }
}
