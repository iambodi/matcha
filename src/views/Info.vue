<template>
  <v-row justify="center">
      <!-- <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
        <div class="text-center"><span>{{text}}</span></div>
      </v-snackbar> -->
    <ChangeName v-on:alertMsg="fireAlert"/>
    <ChangeMail v-on:alertMsg="fireAlert"/>
    <ChangePassword v-on:alertMsg="fireAlert"/>
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
        id: localStorage.getItem('id'), // passer id aux fils apres
      }
    },
    methods: {
      fireAlert(state, message) {
        this.$emit('alertMsg', state, message);
      },
    },
}
</script>