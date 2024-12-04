<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $products = new Product();
        $products->product_name = $request->product_name;
        $products->category = $request->category;
        $products->description = $request->description;
        $products->quantity = $request->quantity;
        $products->price = $request->price;
        $barcode = $request->barcode;
        
        $productExists = Product::where('barcode', $barcode)->exists();
        if ($productExists) {
            return response()->json(['error' => 'Barcode already exists'], 422);
        }
        $products->barcode = $barcode;
        $products->save();
        return response()->json($products);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $product = Product::find($request->id);
        $product->product_name = $request->product_name;
        $product->description = $request->description;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
        return response()->json(['message' => 'Product updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $product = Product::find($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
