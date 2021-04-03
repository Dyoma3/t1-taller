<template>
    <v-container fluid>
        <v-row class="justify-center">
            <div class="main-text mt-5">
                Seleccione serie
            </div>
        </v-row>
        <v-row class="justify-center mt-16 mb-7">
            <v-col
                :class="['d-flex',
                $vuetify.breakpoint.xs ? 'justify-center': 'justify-end']"
                cols="xs-12 6"
            >
                <v-hover v-slot="{ hover }">
                    <v-card
                        @click="$router.push('breakingBad')"
                        :elevation="hover ? 22 : 3"
                        :width="$vuetify.breakpoint.xs ? '300px' : '400px'"
                    >
                        <v-img
                            src="../assets/breaking_bad_logo.jpg"
                            height="225px"
                        />
                    </v-card>
                </v-hover>
            </v-col>
            <v-col
                :class="['d-flex',
                $vuetify.breakpoint.xs ? 'justify-center': 'justify-start']"
                cols="xs-12 6"
            >
                <v-hover v-slot="{ hover }">
                    <v-card
                        @click="$router.push('betterCallSaul')"
                        :elevation="hover ? 22 : 3"
                        :width="$vuetify.breakpoint.xs ? '300px' : '400px'"
                    >
                        <v-img
                            src="../assets/better_call_saul_logo.jpg"
                            height="225px"
                        />
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

};
</script>

<style scoped>
.main-text {
  color: white;
  font-size: 30px;
}
</style>