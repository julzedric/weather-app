@extends('layouts.app')

@section('title', 'Weather App')

@section('source', 'cities/Index')

@section('content')
<div class="container" v-cloak>
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="p-4">
                <div class="text-center">
                    <h1 class="font-weight-bold mb-4 text-uppercase">Japan Weather App</h1>
                </div>
                <div class="form-group" v-if="currentForecast.length != 0">
                    <select class="form-control" id="cities" @change="selectCity">
                        <option value="">--Select Your Destination</option>
                        <option v-for="city in cities" :data-lon="city.lon" :data-lat="city.lat" v-text="city.name" :value="city.name"></option>
                    </select>
                </div>
                <div class="text-center" v-if="showIcons">
                    <h4 class="font-weight-bold mb-4">Pick Your Destination</h4>
                    <div class="row">
                        <div class="col-6 col-sm-4 my-4" role="button" v-for="city in cities" :data-lon="city.lon" :data-lat="city.lat" :data-value="city.name" @click="clickCity">
                            <img class="rounded-circle border-dark" :src="['images/icons/'+city.name.toLowerCase()]+'.jpg'" :alt="city.name" width="150" height="150">
                        </div>
                    </div>
                </div>
                <div class="text-center" v-if="weatherLoader">
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
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
                </div>
                <div class="col-md-12" v-if="currentForecast.length != 0">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="nearbyQuery" placeholder="I'm looking for...">
                        <div class="input-group-append">
                            <button class="btn btn-success" type="button" disabled v-if="placesLoader">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </button>
                            <button class="btn btn-success" type="button" @click="searchNearbyPlaces" v-else>Go</button>
                        </div>
                    </div>
                </div>
                <div class="m-2" v-if="nearbyPlaces.length != 0">
                    <ul class="list-group text-body" v-for="place in nearbyPlaces.results">
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