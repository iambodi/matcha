<template>
  <v-app color="red">
    <v-content class="mx-10 mb-10">
        <v-container v-if="!fail">
          <v-snackbar v-bind:timeout="5000" top v-model="snackbar" color="green">   
          <div class="text-center"><span>{{alertmessage}}</span></div>
          </v-snackbar>
        </v-container>  
          <v-container v-else>
          <v-snackbar v-bind:timeout="5000" top v-model="snackbar" color="red darken-3">   
          <div class="text-center"><span>{{alertmessage}}</span></div>
          </v-snackbar>
        </v-container>   
      <!-- ici mettre la snackbar et lui transmettre quand la routerview fire le alertMsg -->
      <router-view v-on:alertMsg="fireAlert"></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  methods: {
    fireAlert(state, message) {
      this.snackbar = true;
      this.alertmessage = message;
      if (state === "success"){
     //   console.log("Success "+ message);
        this.fail = false;
      }
      else{
       // console.log("fail " + message);
        this.fail = true;
      }
    },
  },
  name: 'App',
  data: () => ({
    alertmessage: "",
    color: "",
    snackbar: false,
    fail: false,
  }),

};
</script>

<style scoped>
.theme--light.v-application
{
    background: none;
}
</style>
