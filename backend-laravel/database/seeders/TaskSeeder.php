<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 8782,
                'title' => "You can't compress the program without quantifying the open-source SSD pixel!",
                'status' => 'pending'
            ],
            [
                'id' => 7878,
                'title' => "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
                'status' => 'pending'
            ],
            [
                'id' => 7839,
                'title' => "We need to bypass the neural TCP card!",
                'status' => 'pending'
            ],
            [
                'id' => 5562,
                'title' => "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
                'status' => 'pending'
            ],
            [
                'id' => 8686,
                'title' => "I'll parse the wireless SSL protocol, that should driver the API panel!",
                'status' => 'done'
            ],
            [
                'id' => 1280,
                'title' => "Use the digital TLS panel, then you can transmit the haptic system!",
                'status' => 'done'
            ],
            [
                'id' => 7262,
                'title' => "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
                'status' => 'done'
            ],
            [
                'id' => 1138,
                'title' => "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
                'status' => 'pending'
            ],
            [
                'id' => 7184,
                'title' => "We need to program the back-end THX pixel!",
                'status' => 'pending'
            ],
            [
                'id' => 5160,
                'title' => "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
                'status' => 'pending'
            ]
        ];

        foreach ($data as $datum) {
            $task = new Task();
            $task->id = $datum['id'];
            $task->title = $datum['title'];
            $task->status = $datum['status'];
            $task->save();
        }
    }
}
