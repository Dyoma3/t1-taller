<template>
    <v-container >
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
            {{ this.series }}
        </v-row>
        <v-row justify="center">
            <v-expansion-panels class="my-10"
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
                        <v-row
                            class="my-2 pl-5"
                            v-for="(episode, i) in seasonEpisodes[season]"
                            :key="i"
                        >
                            <div style="color:grey">
                                {{ episode.number }}
                            </div>
                            <div class="ml-10" style="color:white">
                                {{ episode.title }}
                            </div>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    data: () => ({
        loading: true,
        seasons: [],
        seasonEpisodes: {},
    }),
    computed: {
        series() {
            return this.$route.name
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
                        title: item.episode_id,
                        id: item.id,
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
            console.log(this.seasons);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            this.loading = false;
        })
    },

};
</script>