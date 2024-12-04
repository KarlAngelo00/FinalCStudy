<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Cart::all();
        $response = [];
        $grandTotal = 0;

        if ($carts->isEmpty()) {
            return response()->json(['message' => 'Cart is empty.']);
        }

        foreach ($carts as $cart) {
            $product = Product::find($cart->product_id);

            $totalPricePerProduct = $cart->quantity * $product->price;

            $response[] = [
                'id' => $cart->id,
                'product_name' => $product->product_name,
                'quantity' => $cart->quantity,
                'total_price_per_product' => $totalPricePerProduct,
            ];

            $grandTotal += $totalPricePerProduct;
        }

        return response()->json([
            'items' => $response,
            'grand_total' => $grandTotal,
        ]);
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
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::firstOrCreate([
            'product_id' => $request->product_id,
        ], [
            'quantity' => 1,
        ]);

        if ($cart->wasRecentlyCreated) {
            $cart->quantity = 1;
        } else {
            $cart->quantity += 1;
        }

        $cart->save();
        
        return response()->json(['message' => 'Product added to cart successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $cart = Cart::find($request->id);
        $cart->quantity = $request->quantity;
        $cart->save();
        return response()->json(['message' => 'Cart item updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id = null) {
        if ($id) {

            $cart = Cart::find($id);
            
            if ($cart) {
                $cart->delete();
                return response()->json(['message' => 'Cart item deleted successfully.']);
            } else {
                return response()->json(['message' => 'Cart item not found.'], 404);
            }
        } else {
            
            Cart::truncate();
            return response()->json(['message' => 'All cart items checked out successfully.']);
        }
    }

}
