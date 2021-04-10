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
        ref="autocomplete"
        rounded
        dense
        :loading="loading"
        :no-data-text="loading ? 'Cargando...' : 'No hay personajes con este nombre'"
        :hide-no-data="!searchValue || searchValue === ''"
        color="#e50914"
        placeholder="Buscar personaje"
        outlined
        :class="[$vuetify.breakpoint.xs ? 'mr-2' : 'mr-7', 'mt-6']"
        v-model="character"
        :items="candidates"
        item-text="name"
        item-value="name"
        :style="{maxWidth: $vuetify.breakpoint.xs ? '180px' : '400px'}"
        @update:search-input="searchValue = $event"
      >
        <template v-slot:item="data">
          <v-list-item-avatar>
            <img :src="data.item.img">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
          </v-list-item-content>
        </template>
        <template v-if="shouldLoadMore || error" v-slot:append-item
        >
          <v-row
            v-if="error"
            class="ma-0 pt-2 justify-center align-center"
          >
            Ha habido un error al cargar los datos
          </v-row>
          <v-row
            v-else
            class="ma-0 pt-2 justify-center align-center"
            style="cursor:pointer"
            v-observe-visibility="(isVisible) => loadMore(isVisible)"
          >
            Cargando...
          </v-row>
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
    scrolledToBottom: false,
    offset: 10,
    shouldLoadMore: false,
    error: false,
  }),
  computed: {
    couldLoad() {
      return true;
    },
  },
  methods: {
    navigate() {
      if (!(this.$route.path === '/')) {
        this.$router.push('/');
      }
    },
    loadMore(isVisible) {
      if (isVisible && this.shouldLoadMore) {
        this.scrolledToBottom = true;
        axios({
          method: 'get',
          url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/?name=${this.searchValue}&offset=${this.offset}`,
        }).then((response) => {
          this.candidates = [
            ...this.candidates,
            ...response.data,
          ];
          if (response.data.length === 10) {
            this.shouldLoadMore = true;
            this.offset += 10
          } else {
            this.shouldLoadMore = false;
          }
          this.scrolledToBottom = false;
        }).catch(() => {
          this.error = true;
        })

      }
    }
  },
  watch: {
    searchValue: _.debounce(function (value) {
      // reset parameters
      this.scrolledToBottom = false;
      this.offset = 10;
      this.shouldLoadMore = false;
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
        if (this.candidates.length === 10) {
          this.shouldLoadMore = true;
        }
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
    }, 500),

    character() {
      if (this.character && this.character !== '') {
        this.$router.push({
          name: 'Character',
          params: {
            name: this.character,
          },
        }).then(() => {
          this.character = '';
          this.$refs.autocomplete.internalSearch = '';
        })
        .catch(() => {});
      }
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
  font-size: 22px;
  font-weight:500;
  cursor:pointer;
}
</style>
