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
    
      <v-autocomplete
        dense
        :loading="loading"
        :no-data-text="loading ? 'Cargando...' : 'No hay personajes con este nombre'"
        :hide-no-data="!searchValue || searchValue === ''"
        color="#e50914"
        placeholder="Buscar personaje"
        outlined
        :class="[$vuetify.breakpoint.xs ? 'mr-2' : 'mr-7', 'mt-5']"
        v-model="character"
        :items="candidates"
        item-text="name"
        item-value="name"
        :style="{maxWidth: $vuetify.breakpoint.xs ? '200px' : '400px'}"
        @update:search-input="searchCharacter"
      >
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar>
              <img :src="data.item.img">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-app-bar>

    <v-main style="background-color:#2b2727">
      <router-view ref="routerView" />
    </v-main>
  </v-app>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    loading: false,
    character: '',
    candidates: [],
    searchValue: '',
  }),
  methods: {
    navigate() {
      if (!(this.$route.path === '/')) {
        this.$router.push('/');
      }
    },
    searchCharacter: _.debounce(function (value) {
      this.searchValue = value;
      if (!value || value === '') {
        this.candidates = [];
        return;
      }
      this.loading = true;
      axios({
          method: 'get',
          url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/?name=${value}`,
      }).then((response) => {
        this.candidates = response.data;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
    }, 500),
  },
  watch: {
    character() {
      this.$router.push({
        name: 'Character',
        params: {
          name: this.character,
        },
      }).catch(() => {});
    },
  },
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
