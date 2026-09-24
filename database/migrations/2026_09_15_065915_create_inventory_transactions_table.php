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
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();

            $table->enum('transaction_type', [
                'stock_in',
                'stock_out',
                'adjustment',
            ]);

            $table->enum('reason', [
                'supplier_delivery',
                'customer_return',
                'initial_stock',
                'transfer_in',
                'stock_correction',
                'other',
                'sale',
                'damage',
                'expired',
                'transfer_out',
                'lost',
                'sample',
                'physical_count',
                'inventory_audit',
                'correction',
                'system_adjustment',
            ]);

            $table->enum('status', [
                'draft',
                'posted',
                'cancelled',
            ])->default('draft');

            $table->string('reference_type')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('reference_number')->unique()->nullable();

            $table->foreignId('warehouse_id')
                ->nullable()
                ->constrained('warehouses')
                ->restrictOnDelete();

            $table->text('remarks')->nullable();

            $table->foreignId('created_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamp('posted_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
