<template>
  <v-app>
    <v-app-bar
      app
      color="#0e0e0e"
      dark
    >
      <div
        @click="navigate"
        class="ml-10"
        style="color: #e50914;font-size: 40px;font-weight:500;cursor:pointer"
      >
        TAREA 1
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="background-color:#2b2727">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    navigate() {
      if (!(this.$route.path === '/')) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.title{
  color: #e50914;
  font-size: 60px;
}
</style>
