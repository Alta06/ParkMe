<script setup>
    import {
        onMounted,
        reactive
    } from 'vue'
    import SearchResults from '../components/SearchResults.vue'
    import {
        shallowRef
    } from 'vue'
    import Nice from '../assets/nice.json'

    let dataParkings = reactive({});
    let parkings = reactive([]);
    class Parking {
        constructor(name, freeSpace, coordinates) {
            this.name = name;
            this.freeSpace = freeSpace;
            this.coordinates = coordinates;
        }
    }
    let city = "";
    const activeComponent = shallowRef(SearchResults);

    //request a city to the API that match the input of the user
    async function getParkings() {
        switch (this.city) {
            case "Poitiers":
                await fetch(
                        "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel@grandpoitiers&q="
                    ).then(response => response.json())
                    .then(datas => dataParkings = datas.records)
                    .catch(err => console.log(err))
                for (let key of dataParkings) {
                    parkings.push(new Parking(key.fields.nom, key.fields.places_restantes, key.fields.geo_point_2d))
                }
                break;

            case "Nantes":
                await fetch(
                        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-horaires&q=&facet=nom_periode&facet=jour"
                    ).then(response => response.json())
                    .then(datas => dataParkings = datas.records)
                    .catch(err => console.log(err))
                for (let key of dataParkings) {
                    parkings.push(new Parking(key.fields.nom, key.fields.places_restantes, key.fields.geo_point_2d))
                }
                break;

            case "Lille":
                await fetch(
                        "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&q=&facet=libelle&facet=ville&facet=etat"
                    ).then(response => response.json())
                    .then(datas => dataParkings = datas.records)
                    .catch(err => console.log(err))
                for (let key of dataParkings) {
                    parkings.push(new Parking(key.fields.libelle, key.fields.dispo, key.fields.geometry
                        .coordinates))
                }
                for (let key of parkings) {
                    [key.coordinates[0], key.coordinates[1]] = [key.coordinates[1], key.coordinates[0]
                    ]
                }
                break;
            case "Nice":
                dataParkings = Nice.docs;
                for (let key of dataParkings) {
                    parkings.push(new Parking(key.NOM, '', key.geometry.coordinates));
                }
                for (let key of parkings) {
                    [key.coordinates[0], key.coordinates[1]] = [key.coordinates[1], key.coordinates[0]]
                }

                break;
            default:
                console.log("no match");
        }
    }

    //empty array to go back to homepage
    function back() {
        parkings.length = 0;
        document.getElementById('citySelect').value = "";
    }
    console.log(parkings)
</script>

<template>
    <div class="searchResult">
        <form onsubmit="return false">
            <label for="citySelect">Je recherche un parking à :</label>
            <input id="citySelect" class="classicInput" type="text" name="city" v-model="city" list="city">
            <datalist id="city">
                <option value="Poitiers"></option>
                <option value="Nantes"></option>
                <option value="Lille"></option>
                <option value="Nice"></option>

            </datalist>
            <button class="submitButton btn" type="submit" @click="getParkings()">Rechercher</button>
        </form>
        <Transition name="fade" mode="out-in">
            <SearchResults @back="back" :is="activeComponent" :parkings="parkings" :city="city" />
        </Transition>

    </div>
</template>


<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: 0.5s ease;

    }

    .fade-enter-from,
    .fade-leave-to {

        transform: translateX(100%);

    }

    .btn {
        color: #0D0C1D;
        background-color: #F1DAC4;
        padding: 6px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 5vh;
        display: flex;
        font-size: 1em;

    }

    .searchResult {

        position: relative;
        height: auto;

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
            width: 75%;
            margin: auto;
            border: none;
            font-size: 1.5em;
        }
    }

    .results {
        margin-top: 35px;
        top: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        width: 100%;
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
                height: 13vh;
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