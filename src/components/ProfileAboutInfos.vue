<template>
  <v-card-text>
    <v-col cols="12" sm="6">
      <v-select v-model="setGender" label="Gender" :items="gender"></v-select>
    </v-col>
    <div class="my-4 subtitle-1 black--text">Write something about yourself:</div>
    <v-textarea v-model="bio" counter label="Bio" :value="bio"></v-textarea>
    <v-btn @click="updatePrefs">Update</v-btn>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      bio: "Hello!",
      gender: ["Male", "Female"],
      setGender: "",
      interests: "",
      distance: "",
      agerange: [],
      pop: ""
    };
  },
  mounted() {
    this.getPrefs();
  },
  methods: {
    async getPrefs() {
      try {
        const res = await axios.get(
          "http://localhost:8001/setting/" + this.id, {});
        if (res.data && res.data.user && res.data.user.length != 0) {
          let user = res.data.user[0];
          this.bio = user.bio;
          this.setGender = user.gender;
          this.interests = user.interest;
          this.distance = user.distance;
          this.agerange = [user.minage, user.maxage];
          this.pop = user.pop; // voir si c'est vraiment pop ou popularity
        }
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    },
    async updatePrefs() {
      try {
        const res = await axios.post(
          "http://localhost:8001/updatePreferences",
          {
            bio: this.bio,
            gender: this.setGender,
            interest: this.interests,
            distance: this.distance,
            minage: this.agerange[0],
            maxage: this.agerange[1],
            pop: this.pop,
            id: this.id
          }
        );
        this.$emit('alertMsg', "success", "Successfuly updated your informations")
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    }
  }
};
</script>