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
        :class="[$vuetify.breakpoint.xs
        ? 'ml-3' : 'ml-10', $vuetify.breakpoint.xs
        ? 'mobile-title': 'standard-title']"
      >
        TAREA 1
      </div>
      <v-spacer/>
      <!-- <div class="d-flex ml-6 mt-7">
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
      </div> -->
      
      <v-autocomplete
        ref="lala"
        dense
        :no-data-text="loading ? 'Cargando...' : 'No hay personajes con este nombre'"
        :hide-no-data="searchValue === ''"
        color="#e50914"
        placeholder="Buscar personaje"
        outlined
        :class="[$vuetify.breakpoint.xs ? 'mr-2' : 'mr-7', 'mt-5']"
        v-model="character"
        :items="candidates"
        :style="{maxWidth: $vuetify.breakpoint.xs ? '200px' : '400px'}"
        @update:search-input="changeSearchValue"
      >

      </v-autocomplete>
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
    loading: false,
    character: '',
    candidates: [],
    searchValue: '',
  }),
  methods: {
    changeSearchValue(value) {
      this.searchValue = value;
    },
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
    searchCharacterApi() {

    },
  }
};
</script>

<style scoped>
.standard-title {
  color: #e50914;
  font-size: 40px;
  font-weight:500;
  cursor:pointer;
}
.mobile-title {
  color: #e50914;
  font-size: 24px;
  font-weight:500;
  cursor:pointer;
}
</style>
