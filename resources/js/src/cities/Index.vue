<script>

export default {
    data:{
        selectedCity: '',
        cities: [],
        cityForecast: [],
        cityPlaces: []
    },
    methods:{
        selectCity(e){
            this.selectedCity = e.target.value;
            
            if (this.city == '') {
                return;
            }

            this.cityPlaces = [];

            return axios.get(`/api/city-forecast?city=${this.selectedCity}`)
            .then(response => {
                this.cityForecast = response.data;
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