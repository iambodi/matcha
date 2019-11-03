<template>
  <v-container v-if="matchedUser !== null && getPhoto" fluid fill-height justify-center align-center>
      <ProfileMatch :key="this.matchedUser.id_user" :socket="this.socket" v-on:alertMsg="fireAlert" :user="this.matchedUser" :idUser="this.id"/>
  </v-container>
    <v-card v-else class="mx-auto"
    max-width="360"
    outlined>
    <v-card-text>You need to add a picture of you to start to match</v-card-text>
  </v-card>
</template>



<script>
import ProfileMatch from "../components/ProfileMatch"

export default {
  data () {
    return {
      id: parseInt(localStorage.getItem('id')),
      maxAge: 0,
      minAge: 0,
      interest: "Both",
      pop: 0,
      tags: [],
      matchedUser: null,
      matched: false,
      getPhoto: false,
    }
  },
  async mounted() {
    await this.enterViewHome()
    await this.getUserPhoto()
    await this.getMatch()
    if (this.matched)
    {
      await this.getPictures();
      await this.getUserTags();
      let year = new Date().getFullYear();
      this.matchedUser.year = year - this.matchedUser.year;
      if (this.matchedUser.tags) {
        this.matchedUser.selected = [];
        for (let i = 0; i < this.matchedUser.tags.length; i++) {
          this.matchedUser.selected.push(this.matchedUser.tags[i].id_tag - 1)
        }
      }
    }

  },
  components: {
    ProfileMatch,
  },
  props: {
    socket: Object,
  },
  methods: {
    async getUserPhoto() {
      try {
        const res = await axios.get("http://localhost:8001/getUserPhotos/" + this.id, {})
        if (res.data.photos.length === 0)
        this.getPhoto = false;
        else {
          this.getPhoto = true;
        }
      } catch {
          this.$emit("alertMsg", "fail", "Error, please retry");
      }
    },
    async enterViewHome() {
    try {
     const res = await axios.get("http://localhost:8001/home/" + this.id, {})
      let user = res.data;
      this.maxAge = user.maxage;
      this.minAge = user.minage;
      this.interest = user.interest;
      this.tags = user.prefTags;
      } catch(error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
      }
    },
    async getMatch() {
      try {
        // let year = new Date().setFullYear;
        const res2 = await axios.post("http://localhost:8001/getUserToSwipe/", {
          minage: this.minAge,
          maxage: this.maxAge,
          prefTags: this.tags,
          interest: this.interest,
          id: this.id,
          popularity: 100,
        })
        if (res2.success !== true)
          this.matched = true;
        this.matchedUser = res2.data;
      } catch(error) {
            this.$emit("alertMsg", "fail", "Error, please retry");        
      }
    },
    async getPictures() {
      try {
        const res3 = await axios.get("http://localhost:8001/getUserPhotos/" + this.matchedUser.id, {})
          this.matchedUser.photo = res3.data.photos[0].photo;
      } catch (error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
        
      }
    },
    async getUserTags() {
      try {
        const res4 = await axios.get("http://localhost:8001/getUserTags/" + this.matchedUser.id, {})
        this.matchedUser.tags = res4.data.userTags;
      } catch(error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
        
      }
    },
    async getNewUser() {
    this.matchedUser = null;
    await this.getMatch()
    if (this.matchedUser !== null)
    {
      await this.getPictures();
      await this.getUserTags();
      let year = new Date().getFullYear();
      this.matchedUser.year = year - this.matchedUser.year;
      if (this.matchedUser.tags) {
        this.matchedUser.selected = [];
        for (let i = 0; i < this.matchedUser.tags.length; i++) {
          this.matchedUser.selected.push(this.matchedUser.tags[i].id_tag - 1)
        }
      }
    }
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
      this.getNewUser();
    },
  },
  computed: {
  }
};
</script>
