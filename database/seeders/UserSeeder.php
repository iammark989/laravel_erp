<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administrator = Role::where('slug', 'administrator')->firstOrFail();

        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'first_name' => 'System',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'suffix' => null,
                'email' => 'admin@example.com',
                'mobile' => null,
                'password' => Hash::make('P@ssword1!'),
                'image' => null,
                'role_id' => $administrator->id,
                'is_active' => true,
            ]
        );
    }
}