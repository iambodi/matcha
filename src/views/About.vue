// l'ajout de photos ne marche que si on attend entre 2 clic de bouton
<template>
  
  <div class="about">
    <v-row justify="center" align="center">
      <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
        <div class="text-center"><span>{{resText}}</span></div>
      </v-snackbar>
    <ProfilePicture v-on:alertMsg="fireAlert"/>
    <ProfileAbout v-on:alertMsg="fireAlert"/>
  </v-row>
  </div>
</template>

<script>
import ProfileAbout from '../components/ProfileAbout'
import ProfilePicture from '../components/ProfilePicture'
export default {
  components: {
    ProfileAbout,
    ProfilePicture,
  },
  data () {
    return {
      id: localStorage.getItem('id'),
      snackbar: false,
      resText : "",
      }
    },
    mounted () {
    },
    methods: {
      fireAlert(state, message) {
        this.$emit('alertMsg', state, message);
      },
    },
}
</script>