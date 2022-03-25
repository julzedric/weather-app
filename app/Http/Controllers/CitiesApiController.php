<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CitiesApiController extends Controller
{
    public function getCitiesApi()
    {
        $cities = [
            [
                'name'  =>  'Tokyo',
                'lat'   =>  35.6762,
                'lon'  =>  139.6503
            ],
            [
                'name'  =>  'Yokohama',
                'lat'   =>  35.4437,
                'lon'  =>  139.6380
            ],
            [
                'name'  =>  'Kyoto',
                'lat'   =>  35.0116,
                'lon'  =>  135.7681
            ],
            [
                'name'  =>  'Osaka',
                'lat'   =>  34.6937,
                'lon'  =>  135.5023
            ],
            [
                'name'  =>  'Sapporo',
                'lat'   =>  43.0618,
                'lon'  =>  141.3545
            ],
            [
                'name'  =>  'Nagoya',
                'lat'   =>  35.1815,
                'lon'  =>  136.9066
            ],
        ];

        return response($cities);
    }

    public function getCityForecast(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $client = new Client();

        $response = $client->request('GET', "https://api.openweathermap.org/data/2.5/onecall?lat={$lat}&lon={$lon}&exclude=hourly,minutely&units=metric&appid=5f7f84a3021ea834b93a83b2574c177f");
        
        return response($response->getBody());
    }

    public function getCityNearbyPlaces(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $query = $request->input('query');
        $client = new Client();

        $response = $client->request('GET', "https://api.foursquare.com/v3/places/nearby?ll={$lat},{$lon}&query={$query}", [
            'headers' => [
              'Accept' => 'application/json',
              'Authorization' => 'fsq35tMjgUI2eh6YBNZ2w5RHPW+GHEjHyPlnjwGY0nkSSkQ=',
            ],
        ]);
        
        return response($response->getBody());
    }
}
