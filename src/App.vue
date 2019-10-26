<template>
  <v-app color="red">
    <v-content class="mx-10 mb-10">
      <!-- ici mettre la snackbar et lui transmettre quand la routerview fire le alertMsg -->
      <router-view v-on:alertMsg="fireAlert"></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Navbar from '@/components/Navbar'

export default {
  methods: {
    fireAlert(state, message) {
      if (state === "success"){
        console.log("Success "+ message);
      }
      else{
        console.log("fail " + message);
      }
    },
  },
  name: 'App',
  data: () => ({
    //
  }),

};
</script>

<style scoped>
.theme--light.v-application
{
    background: none;
}
</style>
