<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory; // This trait is required for using factories

    // Optionally, you can specify the fillable fields for mass assignment
    protected $fillable = ['name', 'price', 'quantity'];
}
