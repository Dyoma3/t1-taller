<template>
  <v-app>
    <v-app-bar
      app
      color="#0e0e0e"
      dark
      height="100"
    >
      <div
        @click="navigate"
        class="ml-10"
        style="color: #e50914;font-size: 40px;font-weight:500;cursor:pointer"
      >
        TAREA 1
      </div>
      <v-spacer/>
      <div class="d-flex ml-6 mt-7">
        <v-text-field
          class="ma-0 pa-0"
          v-model="character"
          style="border-radius: 4px 0px 0px 4px"
          label="Busca un personaje"
          outlined
          dense
          ref="textToCopy"
          color="#e50914"
        />
        <v-btn
          @click="searchCharacter"
          style="
            border-radius: 0px 4px 4px 0px;
            color: white;
            box-shadow: none;
          "
          color="#e50914"
          height="40"
        >
          Buscar
        </v-btn>
      </div>

    </v-app-bar>

    <v-main style="background-color:#2b2727">
      <router-view ref="routerView" />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    character: '',
  }),
  methods: {
    navigate() {
      if (!(this.$route.path === '/')) {
        this.$router.push('/');
      }
    },
    searchCharacter() {
      this.$router.push({
        name: 'Character',
        params: {
          name: this.character,
        },
      }).catch(() => {});
    },
  }
};
</script>

<style scoped>
.title{
  color: #e50914;
  font-size: 60px;
}
</style>
