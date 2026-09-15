<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inventory_transaction_id')
                ->constrained('inventory_transactions')
                ->cascadeOnDelete();

            $table->foreignId('product_variant_id')
                ->constrained('product_variants')
                ->restrictOnDelete();

            $table->decimal('quantity', 12, 3);

            $table->decimal('stock_before', 12, 3);
            $table->decimal('stock_after', 12, 3);

            $table->text('remarks')->nullable();

            $table->timestamps();

            $table->index( ['product_variant_id', 'inventory_transaction_id'], 'inv_txn_items_variant_txn_index' );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transaction_items');
    }
};
