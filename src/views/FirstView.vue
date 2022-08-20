<script setup>
    import {reactive} from 'vue'
    import SearchResults from '../components/SearchResults.vue'
    import {shallowRef} from 'vue'

    let dataParkings = reactive({});
    let parkings = reactive([]);
    class Parkings {
        constructor(name, freeSpace, coordinates) {
            this.name = name;
            this. freeSpace = freeSpace;
            this.coordinates = coordinates;
        }
    }

    let city = "";
    const activeComponent = shallowRef(SearchResults);

    //request a city to the API that match the input of the user
    async function getParkings() {
        if (this.city === "Poitiers") {
            await fetch(
                    "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel@grandpoitiers&q="
                ).then(response => response.json())
                .then(datas => dataParkings = datas.records);
        for (let key of dataParkings) {
               parkings.push(new Parkings(key.fields.nom, key.fields.places_restantes, key.fields.geo_point_2d))

            }
console.log(parkings)
            
        } else if (this.city === "Nantes") {
            await fetch(
                    "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-horaires&q=&facet=nom_periode&facet=jour"
                ).then(response => response.json())
                .then(datas => dataParkings = datas.records);
            for (let v of dataParkings) {
                parkings.push(v.fields.nom + " - " + v.fields.places_restantes);
              
            }
        }
    }
    
    //empty array to go back to homepage
    function back() {
        parkings.length = 0;
    }
</script>

<template>
    <div class="searchResult">
        <form onsubmit="return false">
            <label for="citySelect">Je recherche un parking à :</label>
            <input class="classicInput" type="text" name="city" v-model="city" list="city">
            <datalist id="city">
                <option value="Poitiers"></option>
                <option value="Nantes"></option>
            </datalist>
            <input class="submitButton btn" type="submit" @click="getParkings()">
        </form>
        <Transition name="fade" mode="out-in">
            <SearchResults @back="back" :is="activeComponent" :parkings="parkings" :city="city" />
        </Transition>

    </div>
</template>


<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition:  0.5s ease;
        
    }

    .fade-enter-from,
    .fade-leave-to {
       
        transform: translateX(500px);

    }

    .btn {
        color: #0D0C1D;
        background-color: #F1DAC4;
        padding: 6px;
        border-radius: 5px;
        text-align: center;
    }

    .searchResult {

        position: relative;
        height:auto;

        form {
            display: flex;
            flex-direction: column;
            margin-top: 50px;
        }

        label {
            font-size: 5vw;
        }

        .classicInput {
            height: 50px;
            border: 2px solid hsl(244deg 23% 8%);
            border-radius: 12px;
            margin: 30px 0 15px 0;
            font-size: 1.5em;
            padding: 15px;
        }

        .submitButton {
            height: 45px;
            width: 75%;
            font-size: 1.5em;
            margin: auto;
            border: none;
        }
    }

    .results {
        margin-top: 35px;
        top: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        background: #0D0C1D;
        padding: 25px;
        overflow-y: scroll;

        ul {
            list-style: none;
            padding: 0;
            margin: 35px 0;

            li {
                margin-top: 35px;
                color: white;
                background-color: hsl(244deg 23% 8%);
                height: 105px;
                border-radius: 12px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .controls {
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .btn {
                    width: 45%;
                }
            }
        }
    }
</style>