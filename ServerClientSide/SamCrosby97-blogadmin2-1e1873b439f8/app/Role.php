<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions() {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * The last method we added allows the role to take a permission and adds to the role.
     * The sync method ensures that all of the DB entries are correct, whereas the save method just adds it to the DB.
     */
    public function givePermissionTo(Permission $permission) {
        return $this->permissions()->sync($permission);
    }
}
