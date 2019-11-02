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
        >
              <div v-if="user.online===1" class="overline mb-0"><v-icon color="green">mdi-access-point</v-icon></div>
        </v-img>
        <v-divider></v-divider>
        <v-row class="pa-0 ml-3 mt-3">
          <v-col>
        <v-btn @click=likeUser(user.id_user) icon>
                <v-icon color="red" x-large>mdi-heart</v-icon>
              </v-btn>
          </v-col>
          <v-col>

              <v-btn @click=dislikeUser(user.id_user) icon>
                <v-icon color="blue" x-large>mdi-close-circle</v-icon>
              </v-btn>
          </v-col>

        </v-row>
      </v-col>
      <v-col>
          <v-layout align-end justify-end>
            <v-btn @click=reportUser(user.id_user) fab small icon class="white">
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

          <div v-if="user.online===0" cols="12">
            last seen: {{lastSeen}}
          </div>
        <v-col>
      <div class="title text--primary">Tags</div>
      <v-chip-group
        active-class="deep-orange lighten-1 white--text"
        column
        multiple
        v-model="selected"
      >
      <v-chip
        disabled
        v-for="(tag, i) in tags" 
        :key="i"
        > {{ tag }}
        </v-chip>
        <!-- 
            PUTAIN DE CHIP QU'ON PEUT TOUJOURS MODIFIER 
            STILL HAVE TO HANDLE THE REPORT LIKE AND
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
      id: parseInt(localStorage.getItem('id')),
      register: false,
      login: false,
      logged: false,
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      lastSeen: "hello",
      raised: false,
      tags: ['Netflix & chill', 'Adventurer', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Romantic', 'Gamer'],
      selected : [3],
    }
  },
  props: {
      idUser: Number,
      socket: Object,
      user: Object,
  },
  mounted () {
      this.lastSeen = this.user.last_connected.split("T")[0];
      if (this.user.tags) {
      for (let i = 0; i < this.user.tags.length; i++) {
          this.selected.push(this.tags.indexOf(this.user.tags[i]))
      }
      }
  },
  methods: {
      async likeUser(user)
      {
        const res = await axios.post("http://localhost:8001/swipe/", {
          id_user: this.id,
          id_user_: user,
          like: 1,
        });
        if (res.data.match === true) {
          this.socket.emit('send notif', {user:user, type:5})
          axios.post("http://localhost:8001/addNotification", {id_user:user, id_user_:this.id, notif:5})
          this.$emit('alertMsg', "success", "you matched !")
        }
        else {
          this.socket.emit('send notif', {user:user, type:4})
          axios.post("http://localhost:8001/addNotification", {id_user:user, id_user_:this.id, notif:4})
          this.$emit('alertMsg', "fail", "you didn't match !")
        }
        this.$emit('deleteUser', user);

      },
      dislikeUser(user)
      {
        axios.post("http://localhost:8001/swipe/", {
          id_user: this.id,
          id_user_: user,
          like: 0
        });
        this.$emit('deleteUser', user);
        this.$emit('alertMsg', "success", "Succesfully disliked user !")
      },
      reportUser(user)
      {
        axios.post("http://localhost:8001/reportUserNotMatched", {
          id_user_: user,
          id_user: this.id,
        });
        this.$emit('deleteUser', user);
        this.$emit('alertMsg', "success", "succesflly reported user !")
      }
  },
  components: {
  },
  computed: {
  }
};
</script>
