// l'ajout de photos ne marche que si on attend entre 2 clic de bouton
<template>
  
  <div class="about">
    <v-row justify="center" align="center">
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