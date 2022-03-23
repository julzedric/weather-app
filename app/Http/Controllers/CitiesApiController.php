<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CitiesApiController extends Controller
{
    public function getCitiesApi()
    {
        $cities = [
            'Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'
        ];

        return response($cities);
    }

    public function getCityForecast()
    {
        $city = request()->get('city');
        $client = new Client();

        $response = $client->request('GET', "https://api.openweathermap.org/data/2.5/forecast?q={$city},JP&units=metric&cnt=5&appid=5f7f84a3021ea834b93a83b2574c177f", [
            'headers' => [
              'Accept' => 'application/json',
              'Authorization' => 'fsq35tMjgUI2eh6YBNZ2w5RHPW+GHEjHyPlnjwGY0nkSSkQ=',
            ],
        ]);
        
        return response($response->getBody());
    }

    public function getCityNearbyPlaces()
    {
        $city = request()->get('city');
        $client = new Client();

        $response = $client->request('GET', "https://api.foursquare.com/v3/places/search?near={$city}", [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'fsq35tMjgUI2eh6YBNZ2w5RHPW+GHEjHyPlnjwGY0nkSSkQ=',
            ],
        ]);

        return response($response->getBody());
    }
}
