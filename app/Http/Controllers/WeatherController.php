<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cities = $this->getCities();

        return view('cities.index', [
            'cities' => $cities
        ]);
    }

    private function getCities()
    {
        $cities = [
            'Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'
        ];

        $client = new Client();

        $result = [];

        foreach ($cities as $city) {
            $response = $client->request('GET', "https://api.openweathermap.org/data/2.5/forecast?q={$city},JP&units=metric&cnt=1&appid=5f7f84a3021ea834b93a83b2574c177f", [
                'headers' => [
                  'Accept' => 'application/json',
                  'Authorization' => 'fsq35tMjgUI2eh6YBNZ2w5RHPW+GHEjHyPlnjwGY0nkSSkQ=',
                ],
            ]);

            $result[] = json_decode($response->getBody());
        }

        return response($result);
    }
}
