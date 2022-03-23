<script>
import moment from 'moment-timezone';

export default {
    data:{
        selectedCity: '',
        cities: [],
        currentForecast: [],
        dailyForecast: [],
        cityPlaces: []
    },
    methods:{
        selectCity(e){
            this.selectedCity = e.target.value;
            let lat = e.currentTarget.selectedOptions[0].getAttribute('data-lat');
            let long = e.currentTarget.selectedOptions[0].getAttribute('data-lon');

            if (this.city == '') {
                return;
            }

            this.cityPlaces = [];

            return axios.get(`/api/city-forecast?lat=${lat}&lon=${long}`)
            .then(response => {
                let {humidity, pressure, sunrise, sunset, temp, feels_like, dt, weather} = response.data.current;
                this.dailyForecast = [];
                
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
                    if (i < 7 && i != 0) {
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
        searchCityPlaces(e){
            if (this.selectedCity == '') {
                return;
            }

            return axios.get(`/api/city-nearby-places?city=${this.selectedCity}`)
            .then(response => {
                this.cityPlaces = response.data;
            })
            .catch(error => {
                console.log(error);
            });
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