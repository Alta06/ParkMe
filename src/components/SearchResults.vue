<script setup>
    defineProps({
        parkings: {
            type: Array,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div v-if="parkings.length" class="results">
        <div class="btn" @click="$emit('back')">Retour</div>
        <p>{{parkings.length}} parkings trouvés à {{city}} :</p>
        <ul>
            <li id="singleResult" v-for="value in parkings">{{ value }} places disponibles
                <div class="controls">

                    <div class="btn">
                        <a href="#">Voir sur la carte</a>
                    </div>
                    <div class="btn">Plus d'infos</div>
                </div>
            </li>
        </ul>
    </div>
</template>



<style lang="scss">
    p {
        margin-top: 25px;
    }
</style>