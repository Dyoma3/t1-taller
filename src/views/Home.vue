<template>
    <v-container fluid>
        <v-row class="justify-center">
            <div class="main-text mt-5">
                Seleccione serie
            </div>
        </v-row>
        <v-row class="justify-center mt-16">
            <v-hover v-slot="{ hover }">
                <v-card
                    class="mr-7"
                    @click="$router.push('breakingBad')"
                    :elevation="hover ? 22 : 3"
                    width="400px"
                >
                    <v-img
                        src="../assets/breaking_bad_logo.jpg"
                        height="225px"
                    >
                    </v-img>

                </v-card>
            </v-hover>

            <v-hover v-slot="{ hover }">
                <v-card
                    class="ml-7"
                    @click="$router.push('betterCallSaul')"
                    :elevation="hover ? 22 : 3"
                    width="400px"
                >
                    <v-img
                        src="../assets/better_call_saul_logo.jpg"
                        height="225px"
                    >

                    </v-img>

                </v-card>
            </v-hover>
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