<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{ 
    protected $fillable = [ 'name', 'slug', 'description', 'is_active', ];
    /**
    * Get the users assigned to this role. 
    */ 
    public function users(): HasMany
    { return $this->hasMany(User::class); 
    } 
    /**
     * Get the attributes that should be cast. 
     * 
     * @return array<string, string> 
     */ 
    protected function casts(): array 
    { return [ 'is_active' => 'boolean', ]; 
    } 
  }