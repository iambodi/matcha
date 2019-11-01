<template>
  <v-col v-if="getPhoto === true">
    <v-row justify="center">
      <SearchFilters v-on:applyFilters="filterResult" v-on:applyOrder="sortResult"/>
    </v-row>
    <UserCard
      v-for="(user, i) in displayedUsers"
      :key="i"
      :user="user"
      v-on:deleteUser="deleteUser"
      v-on:alertMsg="alertMsg"
      :socket="socket"
      :idUser="id"
    />
  </v-col>
  <v-card v-else class="mx-auto"
    max-width="360"
    outlined>
    <v-card-text>You need to add a picture of you to start to match</v-card-text>
  </v-card>
</template>

<script>
import SearchFilters from "../components/SearchFilters";
import UserCard from "../components/UserCard";

export default {
  props: {
    socket: Object,
  },
  components: {
    SearchFilters,
    UserCard
  },
  data() {
    return {
      id: parseInt(localStorage.getItem("id")),
      users: [],
      gender: "",
      interests: "",
      distance: "",
      agerange: [],
      pop: "",
      displayedUsers: [],
      lat: 0.0,
      long: 0.0,
      getPhoto: "",
    };
  },
  async created() {
    await this.getPrefs();
    await this.getAllUsers();
    this.getUserPhoto();
    // this.displayedUsers = this.users;
  },
  methods: {
    async getUserPhoto() {
      try {
        const res = await axios.get("http://localhost:8001/getUserPhotos/" + this.id, {})
        console.log(res.data.photos);
        if (res.data.photos.length === 0)
        this.getPhoto = false;
        else {
          this.getPhoto = true;
        }
      } catch {
          this.$emit("alertMsg", "fail", "Error, please retry");
      }
    },
    sortResult(params) {
      let order = params.order === 0 ? "asc" : "desc";
      let key = "";
      if (params.type === 0) key = "username";
      // voir si je met pas le pseudo
      else if (params.type === 1) key = "age";
      else if (params.type === 2) key = "dist";
      else if (params.type === 3) key = "popularity";
      else key = "firstname";
      this.displayedUsers.sort(this.compareValues(key, order));
    },
    compareValues(key, order = "asc") {
      return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order == "desc" ? comparison * -1 : comparison;
      };
    },
    filterResult(params) {
      this.displayedUsers = [];
      //console.log(params)
      for (let i = 0; i < this.users.length; i++) {
        if (
          params.interests === "Both" ||
          params.interests === this.users[i].gender
        )
          if (
            params.interestsAttirance === "Whatever" ||
            params.interestsAttirance === this.users[i].interest
          )
            if (
              this.users[i].age >= params.minage &&
              this.users[i].age <= params.maxage
            )
              if (this.users[i].popularity >= params.pop)
                if (this.users[i].dist <= params.distance) {
                  let checker = (arr, target) =>
                    target.every(v => arr.includes(v));
                  if (
                    params.tags.length === 0 ||
                    checker(this.users[i].tags, params.tags)
                  )
                    if (
                      params.onlyShowOnline === false ||
                      (params.onlyShowOnline === true &&
                        this.users[i].online === 1)
                    )
                      this.displayedUsers.push(this.users[i]);
                }
      }
      console.log(this.displayedUsers)
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    },
    async getAllUsers() {
      try {
        const res = await axios.post("http://localhost:8001/getAllUsers/", {
          id: this.id
        });
        this.users = res.data.people_list;
        this.calculateAge();
        this.calculateDist();
        this.setTags();
      } catch (err) {
        this.$emit("alertMsg", "fail", "Couldn't retrieve list of users");
      }
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    setTags() {
      let tagNames = [
        "Netflix & chill",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
        "Adventurer"
      ];
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].tags = JSON.parse(this.users[i].tags);
        for (let j = 0; j < this.users[i].tags.length; j++) {
          this.users[i].tags[j] = tagNames[this.users[i].tags[j] - 1];
        }
      }
    },
    calculateAge() {
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].age = 10;
        let date = this.users[i].birthdate.split("T")[0];
        this.users[i].age = this.getAge(date);
      }
    },
    alertMsg(param1, msg)
    {
      this.$emit('alertMsg', param1, msg);
    },
    deleteUser(user) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id_user === user) {
          this.users.splice(i, 1);
        }
      }
      this.displayedUsers = this.displayedUsers.filter(function(value, index, arr, user){
        return value.id_user !== user;
      })
      for (let i = 0; i < this.displayedUsers.length; i++) {
        if (this.displayedUsers[i].id_user !== user) {
           this.displayedUsers.splice(i, 1);
         }
      }
    },
    calculateDist() {
      for (let i = 0; i < this.users.length; i++) {
        let test = JSON.parse(this.users[i].position);
        this.users[i].lat = test.latitude;
        this.users[i].long = test.longitude;
        this.users[i].dist = this.getDist(
          this.lat,
          this.long,
          test.latitude,
          test.longitude,
          "K"
        );
      }
    },
    getDist(lat1, lon1, lat2, lon2, unit) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return dist;
      }
    },
    async getPrefs() {
      try {
        const res = await axios.get(
          "http://localhost:8001/setting/" + this.id,
          {}
        );
        if (res.data && res.data.user && res.data.user.length != 0) {
          let user = res.data.user[0];
          this.bio = user.bio;
          this.gender = user.gender;
          this.interests = user.interest;
          this.distance = user.distance;
          this.agerange = [user.minage, user.maxage];
          this.pop = user.pop;
          let tmp = JSON.parse(user.position);
          this.lat = tmp.latitude;
          this.long = tmp.longitude;
        }
      } catch (error) {
        this.$emit("alertMsg", "fail", "Error, please retry");
      }
    }
  }
};
</script>