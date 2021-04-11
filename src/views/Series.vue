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
            class="justify-center mt-7"
            style="color:white;font-size:30px"
        >
            {{ series }}
        </v-row>
        <v-row
            v-if="error"
            class="justify-center mt-7"
            style="color:grey;font-size:27px"
        >
            Ha habido un error al cargar los datos, intente de nuevo
        </v-row>

        <v-expansion-panels
            v-model="panel"
            class="my-10"
            style="max-width:500px"
        >
            <v-expansion-panel
                v-for="(season, i) in seasons"
                :key="i"
                style="background-color:#0e0e0e;max-width:500px;"
            >
                <v-expansion-panel-header style="color:white">
                    <v-row justify="center" style="font-size:19px">
                        Temporada {{ season }}
                    </v-row>
                    <template v-slot:actions>
                        <v-icon color="white">
                            mdi-menu-down
                        </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div
                        class="mb-5"
                        style="color:white;font-size:25px"
                    >
                        Episodios
                    </div>
                    <div
                        v-for="(episode, i) in seasonEpisodes[season]"
                        :key="i"
                    >
                        <v-divider style="border-color: grey"/>
                        <v-row
                            @click="navigate(episode.id)"
                            class="my-2 pl-5"
                            style="cursor:pointer"
                        >
                            <div style="color:grey;">
                                {{ episode.number }}
                            </div>
                            <div :class="[parseInt(episode.number, 10) >= 10 ? 'ml-8' : 'ml-10']"
                            style="color:white">
                                {{ episode.title }}
                            </div>
                        </v-row>
                    </div>
                    
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    props: ['season'],
    data: () => ({
        error: false,
        loading: true,
        seasons: [],
        seasonEpisodes: {},
        panel: null,
    }),
    computed: {
        series() {
            return this.$route.name
        },
    },
    methods: {
        navigate(episode_id) {
            this.$router.push(`episode/${episode_id}`);
        },
    },
    created() {
        const seriesParameter = this.series === 'Breaking Bad'
            ? 'Breaking+Bad'
            : 'Better+Call+Saul';
        axios({
            method: 'get',
            url: `https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=${seriesParameter}`,
        })
        .then((result) => {
            result.data.forEach(item => {
                if (!this.seasons.includes(item.season)) {
                    this.seasons.push(item.season);
                    this.seasonEpisodes[item.season] = [{
                        id: item.episode_id,
                        title: item.title,
                        number: item.episode
                    }];
                } else {
                    this.seasonEpisodes[item.season].push({
                        id: item.episode_id,
                        title: item.title,
                        number: item.episode,
                    })
                }
            });
            if (this.$route.params) {
                this.panel = this.seasons.indexOf(`${this.$route.params.season}`);
            }
        })
        .catch(() => {
            this.error = true;
        })
        .finally(() => {
            this.loading = false;
        })
    },

};
</script>