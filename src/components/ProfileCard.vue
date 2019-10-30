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
          :src="user.photo"
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
        <v-subheader class="display-1 pr-6">{{user.username}}</v-subheader>
                </v-row>
                <v-row class="px-5">  
          <v-icon small>mdi-cake-variant</v-icon>
        <v-subheader class="subtitle-2 pl-0">
          {{user.age}} ans</v-subheader>
          <v-icon >mdi-car-side</v-icon>
        <v-subheader class="subtitle-2 pl-0">
           {{user.dist.toFixed(0)}} km
        </v-subheader>
          <v-icon small >mdi-star-outline</v-icon>
        <v-subheader class="subtitle-2 pl-0">
          {{user.popularity.toFixed(0)}} %
        </v-subheader>
        </v-row>
        <v-col cols="12">
          <v-text-field
            :value="user.bio"
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
        v-model="selected"
      >
      <v-chip
        v-for="(tag, i) in tags" 
        :key="i"
        > {{ tag }}
        </v-chip>
        <!-- 
            PUTAIN DE CHIP QU'ON PEUT TOUJOURS MODIFIER 
            STILL HAVE TO HANDLE THE REPORT LIKE AND DISLIKE BUTTON
        -->
      </v-chip-group>
      </v-col>
      </v-col>
    </v-row>
  </v-card>
  </v-container>
</template>



<script>

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
      selected : [3],
    }
  },
  props: {
      user: Object,
  },
  mounted () {
      console.log(this.user)
      for (let i = 0; i < this.user.tags.length; i++) {
          this.selected.push(this.tags.indexOf(this.user.tags[i]))
      }

  },
  components: {
  },
  computed: {
  }
};
</script>
