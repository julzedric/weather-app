@extends('layouts.app')

@section('title', 'Weather App')

@section('source', 'cities/Index')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card p-4">
                <div class="card-body text-center">
                    <h3 class="font-weight-bold mb-4">Welcome to Weather App</h3>
                    <div class="form-group">
                        <select class="form-control" id="cities" @change="selectCity">
                            <option value="">--Please Select a Destination</option>
                            <option v-for="city in cities" v-text="city" :value="city"></option>
                        </select>
                    </div>
                </div>
                <div class="row m-2" v-if="cityForecast.length != 0">
                    <div class="col-sm-6">
                        <small>@{{ new Date(cityForecast.list[0].dt*1000-(cityForecast.city.timezone*1000)).toLocaleDateString('en-us', { weekday: "short", month: "short", day: "2-digit" }) }}</small>
                        <h3 class="mb-0">Now in @{{ cityForecast.city.name }}</h3>
                        <h1>@{{ cityForecast.list[0].main.temp }} &#8451;</h1>
                        <p>Feels like @{{ cityForecast.list[0].main.feels_like }} &#8451;</p>

                    </div>
                    <small>@{{ new Date(1647981683*1000+(cityForecast.city.timezone)).toLocaleString() }}</small>

                    <div class="col-sm-6">
                        <img :src="['http://openweathermap.org/img/wn/'+cityForecast.list[0].weather[0].icon+'@2x.png']" width="80" height="80">
                        <h4>@{{ cityForecast.list[0].weather[0].description }}</h4>
                    </div>

                    <div class="col-sm-4 text-center" v-for="forecast in cityForecast.list">
                        <p>@{{ (new Date(forecast.dt_txt)).toLocaleString() }}</p>
                        <img :src="['http://openweathermap.org/img/wn/'+forecast.weather[0].icon+'@2x.png']" width="50" height="50">
                        <p>@{{ forecast.main.temp }} &#8451;</p>
                    </div>

                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary btn-block btn-lg mt-3" @click="searchCityPlaces" v-if="cityPlaces.length == 0">
                            See Best Places to Visit in @{{ cityForecast.city.name }}
                        </button>
                        
                        <h3 class="text-center mt-5 font-weight-bold" v-else>Best Places to Visit in @{{ cityForecast.city.name }}</h3>
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