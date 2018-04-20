<?php

use Illuminate\Database\Seeder;

class QuestionnairesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questionnaires')->insert([
            ['id' => 1, 'title' => "Survey1", 'creation_date' => "21/04/20117", 'description' => "Survey1 Description"],
            ['id' => 2, 'title' => "Survey2", 'creation_date' => "21/04/2017", 'description' => "Survey2 Description"],
        ]);
    }
}
