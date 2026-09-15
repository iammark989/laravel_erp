<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\GoodsReceipt;
use App\Models\InventoryAdjustment;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use App\Models\Role;
use App\Models\Warehouse;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'username',
    'first_name',
    'middle_name',
    'last_name',
    'suffix',
    'email',
    'mobile',
    'password',
    'image',
    'role_id',
    'is_active',
])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the user's role.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get products created by this user.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'created_by');
    }

    /**
     * Get product variants created by this user.
     */
    public function createdProductVariants(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'created_by');
    }

    /**
     * Get product variants updated by this user.
     */
    public function updatedProductVariants(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'updated_by');
    }

    /**
     * Get warehouses created by this user.
     */
    public function createdWarehouses(): HasMany
    {
        return $this->hasMany(Warehouse::class, 'created_by');
    }

    /**
     * Get warehouses updated by this user.
     */
    public function updatedWarehouses(): HasMany
    {
        return $this->hasMany(Warehouse::class, 'updated_by');
    }

    /**
     * Get inventory transactions created by this user.
     */
    public function inventoryTransactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class, 'created_by');
    }

    /**
     * Get purchase orders created by this user.
     */
    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class, 'created_by');
    }

    /**
     * Get purchase orders approved by this user.
     */
    public function approvedPurchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class, 'approved_by');
    }

    /**
     * Get purchase orders updated by this user.
     */
    public function updatedPurchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class, 'updated_by');
    }

    /**
     * Get goods receipts created by this user.
     */
    public function goodsReceipts(): HasMany
    {
        return $this->hasMany(GoodsReceipt::class, 'created_by');
    }

    /**
     * Get inventory adjustments created by this user.
     */
    public function inventoryAdjustments(): HasMany
    {
        return $this->hasMany(InventoryAdjustment::class, 'created_by');
    }


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }
}
