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
            class="justify-center my-10 main-text"
        >
            {{ episodeData.title }}
        </v-row>
        <v-card
            v-if="episodeData"
            style="background-color:#0e0e0e"
        >
            <v-container class="pa-6" style="max-width:500px; position:relative"> 
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

                <v-row style="width:100%">
                    <v-col cols="12" class="subtitle pa-0">
                        Personajes:
                    </v-col>
                    <v-col class="d-flex justify-center col-md-6 col-12"
                        v-for="(character, i) in episodeData.characters"
                        :key="i"
                    >
                        <v-hover 
                            v-slot="{ hover }"    
                        >
                            <a
                                @click="openCharacter(character)"
                                :style="{
                                    textTransform: 'none',
                                    textAlign: 'center',
                                    color: hover ? '#2C384A' : '#039BE5',
                                    fontSize: '22px',
                                }"
                            >
                                {{ character }}
                            </a>
                        </v-hover>
                    </v-col>
                </v-row>

            </v-container>

        </v-card>
        <v-dialog v-model="characterVisible"
            transition="dialog-bottom-transition"
            width="550"
        >
            <v-container
            class="pt-0 px-0 ma-0"
            style="background-color:#2b2727;overflow:hidden">
                <div
                class="d-flex flex-column align-center"
                style="background-color:#0e0e0e;position:relative">
                    <v-img
                        v-if="selectedCharacterData && !characterError"
                        contain
                        height="200px"
                        :src="selectedCharacterData.img"
                    >

                    </v-img>
                    <div
                        class="main-text my-3"
                    >
                        {{ selectedCharacter }}
                    </div>

                    <v-icon color="white"
                        @click="characterVisible = false"
                        style="position:absolute; right:8px;top:10px"
                    >
                        mdi-close
                    </v-icon>
                </div>
                <v-row
                    v-if="loadingCharacter"
                    style="height: 300px;position:relative"
                >
                    <v-overlay absolute>
                        <v-progress-circular
                            :size="70"
                            :width="7"
                            color="#e50914"
                            indeterminate
                        />
                    </v-overlay>
                </v-row>
                <v-row
                    v-if="characterError"
                    style="height: 300px;position:relative"
                    class="subtitle justify-center align-center"
                >
                    No se han podido cargar los datos
                </v-row>
                <div v-if="selectedCharacterData && !loadingCharacter && !characterError"
                class="d-flex flex-column pa-5">
                    <v-row>
                        <div class="subtitle mr-2">
                            Nickname:
                        </div>
                        <div class="data-text">
                            {{ selectedCharacterData.nickname }}
                        </div>
                    </v-row>
                    <v-row>
                        <div class="subtitle mr-2">
                            Roles:
                        </div>
                        <div class="data-text">
                            {{ characterOccupations }}
                        </div>
                    </v-row>
                    <v-row>
                        <div class="subtitle mr-2">
                            Actor/Actriz:
                        </div>
                        <div class="data-text">
                            {{ selectedCharacterData.portrayed }}
                        </div>
                    </v-row>
                    <v-row>
                        <div class="subtitle mr-2">
                            Estado:
                        </div>
                        <div class="data-text">
                            {{ selectedCharacterData.status }}
                        </div>
                    </v-row>
                    <v-row>
                        <div cols="6" class="subtitle mr-2">
                            Temporadas Breaking Bad:
                        </div>

                        <v-hover 
                            v-for="(season, i) in selectedCharacterData.appearance"
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
                                    i === selectedCharacterData.appearance.length - 1
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
                            v-for="(season, i) in selectedCharacterData.better_call_saul_appearance"
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
                                    i === selectedCharacterData.better_call_saul_appearance.length - 1
                                    ? season
                                    :`${season},`
                                }}
                            </a>
                        </v-hover>
                    </v-row>
                    <v-expansion-panels v-if="characterQuotes.length">
                        <v-expansion-panel
                            class="mt-7"
                            style="background-color:#0e0e0e;"
                        >
                            <v-expansion-panel-header style="color:#e4e4e4">
                                <v-row justify="center" style="font-size:21px">
                                    Frases
                                </v-row>
                                <template v-slot:actions>
                                    <v-icon color="white">
                                        mdi-menu-down
                                    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row
                                    v-for="(quote, i) in characterQuotes"
                                    :key="i"
                                    class="my-2"
                                    style="color:#e4e4e4"
                                >
                                    -{{ quote.quote }}
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-container>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        episodeData: null,
        loading: true,
        loadingCharacter: false,
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
        },
        selectedCharacter: null,
        characterVisible: false,
        selectedCharacterData: null,
        characterError: false,
        characterQuotes: [],
    }),
    computed: {
        date() {
            const dateString = this.episodeData.air_date.split('T')[0];
            const dateArray = dateString.split('-');
            return `${dateArray[2]} de ${this.monthDic[dateArray[1]]}, ${dateArray[0]}`;
        },
        birthday() {
            if (!this.selectedCharacterData) {
                return '';
            } else {
                const birthdayArray = this.selectedCharacterData.birthday.split('-');
                return `${birthdayArray[0]} de ${this.monthDic[birthdayArray[1]]}, ${birthdayArray[2]}`;
            }
        },
        characterOccupations() {
            if (!this.selectedCharacterData) {
                return '';
            } else {
                return this.selectedCharacterData.occupation.join(', ');
            }
        },
    },
    methods: {
        openCharacter(character) {
            this.characterError = false;
            this.selectedCharacter = character;
            this.characterVisible = true;
            this.loadingCharacter = true;
            axios({
                method: 'get',
                url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/?name=${character}`,
            })
            .then((result) => {
                if (result.data.length === 0) {
                    this.characterError = true;
                } else {
                    this.selectedCharacterData = result.data[0];
                    axios({
                        method: 'get',
                        url: `https://tarea-1-breaking-bad.herokuapp.com/api/quote/?author=${character}`,
                    }).then((result) => {
                        this.characterQuotes = result.data;
                    }).catch(() => {
                        this.characterError = true;
                    });
                }
            })
            .catch(() => {
                this.characterError = true;
            })
            .finally(() => {
                this.loadingCharacter = false;
            });
        },
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
            url: `https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${this.$route.params.id}`,
        })
        .then((result) => {
            this.episodeData = result.data[0];
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