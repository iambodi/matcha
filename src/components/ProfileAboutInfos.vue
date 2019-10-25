<template>
  <v-card-text>
    <v-col cols="12" sm="6">
      <v-select label="Gender" :items="gender"></v-select>
    </v-col>
    <div class="my-4 subtitle-1 black--text">Write something about yourself:</div>
    <v-textarea counter label="Bio" :value="bio"></v-textarea>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      bio: "Hello!",
      gender: ["Male", "Female"],
      userGender: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const res = await axios.get(
          "http://localhost:8001/setting/" + this.id,
          {}
        );
        this.userGender = res.data.user[0].gender;
        this.bio = res.data.user[0].bio;
      } catch (error) {
       // this.resText = "Error, please retry";
      }
    }
  }
};
</script>