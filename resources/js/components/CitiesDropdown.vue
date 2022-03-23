<!--<template>
    <div class="form-group">
        <select class="form-control" id="cities">
            <option value="">--Please Select a Destination</option>
            <option v-for="city in cities" v-text="city" :value="city"></option>
        </select>
    </div>
</template>

<script>
    export default {
	    name: 'cities-dropdown',
        data: () => ({
            cities: []
        }),
        mounted() {
             axios.get('/api/cities-api')
            .then(response => {
                this.cities = response.data
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
</script>-->
