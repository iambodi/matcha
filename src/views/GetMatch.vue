<template>
  <v-container fluid fill-height justify-center align-center>
<v-card
    elevation="12"
    width="800"
  >
    <v-row
      class="pa-0 mb-3 mt-0"
    >
      <v-col class="shrink">
        <v-img
          height="300"
          width="300"
          src="https://dq1eylutsoz4u.cloudfront.net/2019/03/18155614/conversation-starters-for-dating-600x460.jpg"
        ></v-img>
        <v-divider></v-divider>
        <v-row class="pa-0 ml-3 mt-3">
          <v-col>
        <v-btn icon>
                <v-icon color="red" x-large>mdi-heart</v-icon>
              </v-btn>
          </v-col>
          <v-col>

              <v-btn icon>
                <v-icon color="blue" x-large>mdi-close-circle</v-icon>
              </v-btn>
          </v-col>

        </v-row>
      </v-col>
      <v-col>
          <v-layout align-end justify-end>
            <v-btn fab small icon class="white">
              <v-icon>mdi-alert-octagon-outline</v-icon>
            </v-btn>
          </v-layout>
        <v-row class="px-5">  
        <v-subheader class="display-1 pr-6">Camille</v-subheader>
          <v-icon small>mdi-cake-variant</v-icon>
        <v-subheader class="subtitle-2 pl-0">
          25 ans</v-subheader>
          <v-icon >mdi-car-side</v-icon>
        <v-subheader class="subtitle-2 pl-0">
          12km
        </v-subheader>
          <v-icon small >mdi-star-outline</v-icon>
        <v-subheader class="subtitle-2 pl-0">
          34%
        </v-subheader>
        </v-row>
        <v-col cols="12">
          <v-text-field
            value="hello"
            label="Bio"
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col>
      <div class="title text--primary">Tags</div>
      <v-chip-group
        active-class="deep-orange lighten-1 white--text"
        column
        multiple
      >
      <v-chip
        v-for="(tag, i) in tags" 
        :key="i"
        @click="selected.push(tag)"> {{ tag }}
        </v-chip>
      </v-chip-group>
      </v-col>
      </v-col>
    </v-row>
  </v-card>
  </v-container>
</template>



<script>
import Register from '../components/Register';
import Login from '../components/Login';

export default {
  data () {
    return {
      id: localStorage.getItem('id'),
      register: false,
      login: false,
      logged: false,
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      tags: ['Netflix & chill', 'Adventurer', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Romantic', 'Gamer'],
      selected : [],
    }
  },
  mounted () {

  },
  components: {
    Register,
    Login
  },
  computed: {
    getUser : async function () {
      try {
        console.log(this.logged);
        const res = await axios.get("http://localhost:8001/home/" + this.id, {
        });
        if (res.data.success === true) {
          this.logged = true;
        }               
      } catch (error) {
     //   this.resText = 'Error, please retry';
      }
    },
  }
};
</script>
