<template>
  <v-container v-if="matchedUser !== null" fluid fill-height justify-center align-center>
      <ProfileMatch :socket="this.socket" v-on:alertMsg="fireAlert" :user="this.matchedUser" :idUser="this.id"/>
  </v-container>
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
    }
  },
  async mounted() {
    await this.enterViewHome()
    // console.log(this.id, this.maxAge, this.minAge, this.interest, this.tags)
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
    // console.log(this.matchedUser)
  },
  components: {
    ProfileMatch,
  },
  props: {
    socket: Object,
  },
  methods: {
    async enterViewHome() {
    try {
     const res = await axios.get("http://localhost:8001/home/" + this.id, {})
      // console.log(res);
      let user = res.data;
      this.maxAge = user.maxage;
      this.minAge = user.minage;
      this.interest = user.interest;
      this.tags = user.prefTags;
      } catch(error) {
      console.log(error);
      }
    },
    async getMatch() {
      try {
        const res2 = await axios.post("http://localhost:8001/getUserToSwipe/", {
          minage: this.minAge,
          maxage: this.maxAge,
          prefTags: this.tags,
          interest: this.interest,
          id: this.id,
          popularity: this.pop,
        })
        this.matchedUser = res2.data;
      } catch(error) {
        console.log(error);
      }
    },
    async getPictures() {
      try {
        const res3 = await axios.get("http://localhost:8001/getProfilePhoto/" + this.matchedUser.id, {})
          this.matchedUser.photo = res3.data.photo;
      } catch (error) {
        consolee.log(error);
      }
    },
    async getUserTags() {
      try {
        const res4 = await axios.get("http://localhost:8001/getUserTags/" + this.matchedUser.id, {})
        this.matchedUser.tags = res4.data.userTags;
      } catch(error) {
        console.log(error);
      }
    },
    async getNewUser() {
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
