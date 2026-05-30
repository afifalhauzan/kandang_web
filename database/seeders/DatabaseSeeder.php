<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $owner = User::query()->create([
            'name' => 'Ternak Owner',
            'phone' => '081234567890',
            'email' => 'owner@ternak.local',
            'password' => Hash::make('password'),
            'role' => 'owner',
            'is_active' => true,
        ]);

        $business = Business::query()->create([
            'user_id' => $owner->id,
            'name' => 'Ternak Mart',
            'category' => 'Retail',
            'city' => 'Malang',
            'address' => 'Jl. Ternak No. 1',
            'is_active' => true,
        ]);

        $owner->update(['business_id' => $business->id]);

        $products = collect([
            ['name' => 'Premium Feed 20kg', 'sku' => 'FEED-20KG', 'price' => 215000, 'stock' => 35],
            ['name' => 'Vitamin Booster 1L', 'sku' => 'VIT-1L', 'price' => 78000, 'stock' => 60],
            ['name' => 'Mineral Block', 'sku' => 'MIN-BLOCK', 'price' => 24000, 'stock' => 120],
        ])->map(fn (array $product) => Product::query()->create([
            'business_id' => $business->id,
            'name' => $product['name'],
            'sku' => $product['sku'],
            'price' => $product['price'],
            'stock' => $product['stock'],
            'is_active' => true,
        ]));

        $order = Order::query()->create([
            'user_id' => $owner->id,
            'business_id' => $business->id,
            'order_number' => 'ORD-TERN-0001',
            'status' => 'paid',
            'total' => 0,
        ]);

        $total = 0;
        foreach ($products->take(2) as $index => $product) {
            $quantity = $index + 1;
            $subtotal = $product->price * $quantity;

            OrderItem::query()->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'subtotal' => $subtotal,
            ]);

            $total += $subtotal;
        }

        $order->update(['total' => $total]);
    }
}
