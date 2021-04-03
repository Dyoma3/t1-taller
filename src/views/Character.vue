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
            v-if="error"
            class="subtitle justify-center mt-5"
        >
            No se han podido cargar los datos
        </v-row>

        <v-card v-if="characterData && !loading && !error"
            class="px-10 py-5"
            style="width:600px;background-color:#0e0e0e"
        >
            <v-img
                v-if="characterData"
                contain
                height="300px"
                :src="characterData.img"
            />
            <v-row
                class="main-text my-3 justify-center"
            >
                {{ characterData.name }}
            </v-row>
            <v-row>
                <div class="subtitle mr-2">
                    Nickname:
                </div>
                <div class="data-text">
                    {{ characterData.nickname }}
                </div>
            </v-row>
            <v-row>
                <div class="subtitle mr-2">
                    Roles:
                </div>
                <div class="data-text">
                    {{ occupations }}
                </div>
            </v-row>
            <v-row>
                <div class="subtitle mr-2">
                    Actor/Actriz:
                </div>
                <div class="data-text">
                    {{ characterData.portrayed }}
                </div>
            </v-row>
            <v-row>
                <div class="subtitle mr-2">
                    Estado:
                </div>
                <div class="data-text">
                    {{ characterData.status }}
                </div>
            </v-row>
            <v-row>
                <div cols="6" class="subtitle mr-2">
                    Temporadas Breaking Bad:
                </div>

                <v-hover 
                    v-for="(season, i) in characterData.appearance"
                    :key="i"
                    v-slot="{ hover }"    
                >
                    <a
                        class="mr-2"
                        @click="navigateBreakingBad(season)"
                        :style="{
                            textTransform: 'none',
                            textAlign: 'center',
                            color: hover ? '#2C384A' : '#039BE5',
                            fontSize: '22px',
                        }"
                    >
                        {{ 
                            i === characterData.appearance.length - 1
                            ? season
                            :`${season},`
                        }}
                    </a>
                </v-hover>
            </v-row>
            <v-row>
                <div cols="6" class="subtitle mr-2">
                    Temporadas Better Call Saul:
                </div>

                <v-hover 
                    v-for="(season, i) in characterData.better_call_saul_appearance"
                    :key="i"
                    v-slot="{ hover }"    
                >
                    <a
                        class="mr-2"
                        @click="navigateBetterCallSaul(season)"
                        :style="{
                            textTransform: 'none',
                            textAlign: 'center',
                            color: hover ? '#2C384A' : '#039BE5',
                            fontSize: '22px',
                        }"
                    >
                        {{ 
                            i === characterData.appearance.length - 1
                            ? season
                            :`${season},`
                        }}
                    </a>
                </v-hover>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    data: () => ({
        loading: true,
        characterData: null,
        error: false
    }),
    computed: {
        occupations() {
            if (!this.characterData) {
                return '';
            } else {
                return this.characterData.occupation.join(', ');
            }
        },
    },
    watch: {
        $route() {
            this.loading = true;
            axios({
                method: 'get',
                url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/?name=${this.$route.params.name}`,
            })
            .then(result => {
                if (result.data.length === 0) {
                    this.error = true;
                } else {
                    this.characterData = result.data[0];
                    this.error = false;
                }
            })
            .catch(() => {
                this.error = true;
            })
            .finally(() => {
                this.loading = false;
            });
        },
    },
    methods: {
        navigateBreakingBad(season) {
            this.$router.push({ name: 'Breaking Bad', params: { season } });
        },
        navigateBetterCallSaul(season) {
            this.$router.push({ name: 'Better Call Saul', params: { season } })
        },
    },
    created() {
        axios({
            method: 'get',
            url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/?name=${this.$route.params.name}`,
        })
        .then(result => {
            if (result.data.length === 0) {
                this.error = true;
            } else {
                this.characterData = result.data[0];
            }
        })
        .catch(() => {
            this.error = true;
        })
        .finally(() => {
            this.loading = false;
        });
    },
};
</script>
<style scoped>
.main-text {
    color:white;
    font-size:30px;
}
.subtitle {
    color:grey;
    font-size: 22px;
}
.data-text {
    color: #cfcfcf;
    font-size: 22px;
}
</style>