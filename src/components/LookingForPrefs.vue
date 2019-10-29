<template>
  <div>
    <v-card class="text-center">
      <v-card-title class="deep-orange lighten-1 white--text mb-4">Looking for</v-card-title>
      <v-card-text>
        <v-select
          v-model="interests"
          :items="items"
          :menu-props="{ top: true, offsetY: true }"
          label="Looking For"
        ></v-select>
      </v-card-text>

      <v-subheader>Distance</v-subheader>
      <v-card-text>
        <v-slider
          min="0"
          max="1000"
          v-model="distance"
          track-color="grey"
          thumb-color="deep-orange"
          color="deep-orange"
          thumb-label="always"
        ></v-slider>
      </v-card-text>
      <v-subheader>Age</v-subheader>
      <v-card-text>
        <v-range-slider
          v-model="agerange"
          min="18"
          track-color="grey"
          thumb-color="deep-orange"
          color="deep-orange"
          thumb-label="always"
        ></v-range-slider>
      </v-card-text>
      <v-subheader>Popularity</v-subheader>
      <v-card-text>
        <v-slider v-model="pop" thumb-label="always" track-color="grey"></v-slider>
      </v-card-text>
      <v-btn class="mb-4" @click="updatePrefs">Update Prefs</v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bio: "",
      gender: "",
      interests: "Both",
      distance: 0,
      pop: 0,
      id: localStorage.getItem("id"),
      tags: [
        "Netflix & chill",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
        "Adventurer"
      ],
      agerange: [18, 99],
      items: ["Male", "Female", "Both"],
      selectedNumber: [],
      selected: []
    };
  },
  mounted() {
    this.getPrefs();
  },
  methods: {
    async getPrefs() {
      try {
        const res2 = await axios.get(
          "http://localhost:8001/setting/" + this.id,
          {}
        );
        if (res2.data && res2.data.user && res2.data.user.length != 0) {
          let user = res2.data.user[0];
          this.bio = user.bio;
          this.gender = user.gender;
          this.interests = user.interest;
          this.distance = user.distance;
          this.agerange = [user.minage, user.maxage];
          this.pop = user.pop; // voir si c'est vraiment pop ou popularity
        }
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    },
    updatePrefs() {
      axios.post("http://localhost:8001/updatePreferences", {
        bio: this.bio,
        gender: this.gender,
        interest: this.interests,
        distance: this.distance,
        minage: this.agerange[0],
        maxage: this.agerange[1],
        pop: this.pop,
        id: this.id
      });
    }
  }
};
</script>