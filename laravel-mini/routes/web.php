<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/laravel/listings', function () {
    $rows = DB::table('listings')->select('id', 'title', 'city', 'price', 'bedrooms', 'agentId')->get();

    $data = $rows->map(function ($row) {
        return [
            'id' => $row->id,
            'title' => $row->title,
            'city' => ucfirst(strtolower($row->city)),
            'price' => number_format((float) $row->price, 2, '.', ''),
            'bedrooms' => $row->bedrooms,
            'agentId' => $row->agentId,
            'source' => 'laravel',
        ];
    });

    return response()->json($data);
});
