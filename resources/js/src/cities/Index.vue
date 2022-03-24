<script>
import moment from 'moment-timezone';

export default {
    data:{
        selectedCity: '',
        lat: '',
        lon: '',
        cities: [],
        currentForecast: [],
        dailyForecast: [],
        nearbyPlaces: [],
        nearbyQuery: '',
        weatherLoader: false,
        placesLoader: false
    },
    methods:{
        selectCity(e){
            this.selectedCity = e.target.value;
            this.lat = e.currentTarget.selectedOptions[0].getAttribute('data-lat');
            this.lon = e.currentTarget.selectedOptions[0].getAttribute('data-lon');
            this.currentForecast = [];
            this.weatherLoader = true;

            if (this.selectedCity == '') {
                this.clearPage();
                this.weatherLoader = false;
                return;
            }

            this.nearbyPlaces = [];

            return axios.get(`/api/city-forecast?lat=${this.lat}&lon=${this.lon}`)
            .then(response => {
                let {humidity, pressure, sunrise, sunset, temp, feels_like, dt, weather} = response.data.current;
                this.dailyForecast = [];
                this.weatherLoader = false;
                
                this.currentForecast = {
                    humidity:       `${humidity}%`,
                    pressure:       pressure,
                    sunrise:        moment.unix(sunrise).tz(response.data.timezone).format('h:mm A'),
                    sunset:         moment.unix(sunset).tz(response.data.timezone).format('h:mm A'),
                    temp:           temp,
                    feels_like:     feels_like,
                    current_date:   moment.unix(dt).tz(response.data.timezone).format('ddd, MMM D'),
                    current_time:   moment.unix(dt).tz(response.data.timezone).format('h:mm A'),
                    icon:           weather[0].icon,
                    description:    weather[0].description
                };

                response.data.daily.forEach((daily, i) => {
                    if (i < 6) {
                        this.dailyForecast.push({
                            day:                moment.unix(daily.dt).tz(response.data.timezone).format('ddd, MMM D'),
                            dayTemp:            daily.temp.day,
                            nightTemp:          daily.temp.night,
                            dayFeelsLike:       daily.feels_like.day,
                            nightFeelsLike:     daily.feels_like.night,
                            icon:               daily.weather[0].icon,
                            description:        daily.weather[0].description
                        });
                    }
                });

            })
            .catch(error => {
                console.log(error);
            });
        },
        searchNearbyPlaces(e){
            this.placesLoader = true;

            return axios.get(`/api/city-nearby-places?lat=${this.lat}&lon=${this.lon}&query=${this.nearbyQuery}`)
            .then(response => {
                this.placesLoader = false;
                this.nearbyPlaces = response.data;

                if (response.data.results.length == 0) {
                    alert('no result found!');
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        clearPage(){
            this.currentForecast = [];
            this.dailyForecast = [];
            this.nearbyPlaces = [];
        }
    },
    mounted(){
        axios.get('/api/cities')
        .then(response => {
            this.cities = response.data
        })
        .catch(error => {
            console.log(error);
        });
    }
}
</script>