<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
   public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
        ]);

        Product::create($validatedData);

        return response()->json(['message' => 'Product created successfully']);
    }

    public function index()
    {
        return response()->json(Product::all());
    }


}
