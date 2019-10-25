<template>
  <v-row justify="center">
      <!-- <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
        <div class="text-center"><span>{{text}}</span></div>
      </v-snackbar> -->
    <ChangeName/>
    <ChangeMail/>
    <ChangePassword/>
  </v-row>
</template>


<script>
import ChangeName from '../components/ChangeName'
import ChangeMail from '../components/ChangeMail'
import ChangePassword from '../components/ChangePassword'

export default {
    components: {
      ChangeName,
      ChangeMail,
      ChangePassword,
    },
    data () {
      return {
  //      text: "",
        errorMessages: "",
        snackbar: false,
        id: localStorage.getItem('id'), // passer id aux fils apres
      }
    },
    methods: {
    },
}
</script>