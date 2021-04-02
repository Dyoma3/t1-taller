<template>
    <v-container class="d-flex flex-column align-center">
        <v-overlay v-if="loading" fixed>
            <v-progress-circular
                :size="70"
                :width="7"
                color="#e50914"
                indeterminate
            />
        </v-overlay>
        <v-row
            v-if="episodeData"
            class="justify-center my-10"
            style="color:white;font-size:30px"
        >
            {{ episodeData.title }}
        </v-row>
        <v-card
            v-if="episodeData"
            style="background-color:#0e0e0e"
        >
            <v-row class="pa-6" style="width:800px">
                <v-col
                    class="pr-6"
                    cols="6"
                >   
                    <v-row>
                        <div class="subtitle mr-2">
                            Temporada:
                        </div>
                        <div class="data-text">
                            {{ episodeData.season }}
                        </div>
                    </v-row>
                    <v-row>
                        <div class="subtitle mr-2">
                            Episodio:
                        </div>
                        <div class="data-text">
                            {{ episodeData.episode }}
                        </div>
                    </v-row>
                    <v-row>
                        <div class="subtitle mr-2">
                            Fecha:
                        </div>
                        <div class="data-text">
                            {{ date }}
                        </div>
                    </v-row>

                </v-col>
                <v-col
                    class="pr-6"
                    cols="6"
                >
                    <v-row>
                        <div class="subtitle mr-2">
                            Personajes:
                        </div>
                        <div 
                            v-for="(character, i) in episodeData.characters"
                            :key="i"
                            class="data-text"
                        >
                            {{ character }}
                        </div>
                    </v-row>

                </v-col>
            </v-row>

        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        episodeData: null,
        loading: true,
        monthDic: {
            '01': 'enero',
            '02': 'febrero',
            '03': 'marzo',
            '04': 'abril',
            '05': 'mayo',
            '06': 'junio',
            '07': 'julio',
            '08': 'agosto',
            '09': 'septiempre',
            '10': 'octubre',
            '11': 'noviembre',
            '12': 'diciembre',
        }
    }),
    computed: {
        date() {
            const dateString = this.episodeData.air_date.split('T')[0];
            const dateArray = dateString.split('-');
            return `${dateArray[2]} de ${this.monthDic[dateArray[1]]}, ${dateArray[0]}`;
        },
    },

    created() {
        axios({
            method: 'get',
            url: `https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${this.$route.params.id}`,
        })
        .then((result) => {
            this.episodeData = result.data[0];
            console.log(this.episodeData);
        })
        .finally(() => {
            this.loading = false;
        });
    },
};
</script>
<style scoped>
.subtitle {
    color:grey;
    font-size: 22px;
}
.data-text {
    color: #cfcfcf;
    font-size: 22px;
}
</style>