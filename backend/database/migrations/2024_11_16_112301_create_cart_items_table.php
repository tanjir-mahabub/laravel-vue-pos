<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade'); // Link to cart
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Link to product
            $table->integer('quantity'); // Quantity of the product
            $table->decimal('price', 8, 2); // Price of the product at the time of adding to the cart
            $table->decimal('discount', 8, 2)->nullable(); // Discount on the product (if any)
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_items');
    }
};
