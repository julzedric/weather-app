@extends('layouts.app')

@section('title', 'Weather App')

@section('source', 'cities/Index')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card p-4">
                <div class="card-body text-center">
                    <h3 class="font-weight-bold mb-4">Japan Weather App</h3>
                    <div class="form-group">
                        <select class="form-control" id="cities" @change="selectCity">
                            <option value="">--Please Select a Destination</option>
                            <option v-for="city in cities" :data-lon="city.lon" :data-lat="city.lat" v-text="city.name" :value="city.name"></option>
                        </select>
                    </div>
                </div>

                <div class="row m-2" v-if="currentForecast.length != 0">
                    <div class="col-md-12 text-center">
                        <h3 class="font-weight-bold">Now in @{{ selectedCity }}</h3>
                        <h5>@{{ currentForecast.current_date }}</h5>
                        <h1 class="font-weight-bold display-4">@{{ currentForecast.current_time }}</h1>
                    </div>

                    <div class="col-12 text-center">
                        <img :src="['http://openweathermap.org/img/wn/'+currentForecast.icon+'@2x.png']" width="100" height="100">
                        <h4 class=text-uppercase>@{{ currentForecast.description }}</h4>

                        <h1>@{{ currentForecast.temp }} &#8451;</h1>
                        <p>Feels like @{{ currentForecast.feels_like }} &#8451;</p>
                    </div>

                    <div class="col-6 text-center">
                        <p class="mb-1">
                            <span class="font-weight-bold text-uppercase">Sunrise: </span>
                            @{{ currentForecast.sunrise }}
                        </p>
                        <p class="mb-1">
                            <span class="font-weight-bold text-uppercase">Sunset: </span>
                            @{{ currentForecast.sunset }}
                        </p>
                    </div>

                    <div class="col-6 text-center">
                        <p class="mb-1">
                            <span class="font-weight-bold text-uppercase">Humidity: </span>
                            @{{ currentForecast.humidity }}
                        </p>
                        <p class="mb-1">
                            <span class="font-weight-bold text-uppercase">Pressure: </span>
                            @{{ currentForecast.pressure }} hPa
                        </p>
                    </div>

                    <div class="col-4 col-sm-2 text-center mt-5" v-for="daily in dailyForecast">
                        <p class="mb-1 font-weight-bold">@{{ daily.day }}</p>
                        <img :src="['http://openweathermap.org/img/wn/'+daily.icon+'@2x.png']" width="50" height="50">
                        <p class="mb-1">
                            <small class="font-weight-bold text-uppercase">Day</small>
                            @{{ daily.dayTemp }} &#8451;
                        </p>
                        <p>
                            <small class="font-weight-bold text-uppercase">Night</small>
                            @{{ daily.nightTemp }} &#8451;
                        </p>
                    </div>

                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary btn-block btn-lg mt-3" @click="searchCityPlaces" v-if="cityPlaces.length == 0">
                            See Best Places to Visit in @{{ selectedCity }}
                        </button>
                        
                        <h3 class="text-center mt-5 font-weight-bold" v-else>Best Places to Visit in @{{ selectedCity }}</h3>
                    </div>
                </div>

                <div class="m-2" v-if="cityPlaces.length != 0">
                    <ul class="list-group" v-for="place in cityPlaces.results">
                        <li class="list-group-item d-inline-flex mb-2">
                            <img class="bg-secondary ml-2" :src="category.icon.prefix+'100'+category.icon.suffix" alt="" v-for="category in place.categories" width="50" height="50">
                            <div class="ml-2">
                                <h5 class="font-weight-bold">@{{ place.name }}</h5>
                                <p>Address: @{{ place.location.formatted_address }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection