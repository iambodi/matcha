<template>
  <v-col>
    <v-row justify="center">
      <SearchFilters v-on:applyFilters="filterResult"/>
      <v-btn @click="displayUsers">display users</v-btn>
        <v-btn @click="displayMe">display me</v-btn>
    </v-row>
    <UserCard v-for="(user, i) in displayedUsers" :key="i" :user="user"/>
  </v-col>
</template>
// STILL HAVE TO FILTER FROM TAGS AND MATCH WITH boblebricoleur qui aime les hommes (voir si la distance est pas trop loin)

<script>
import SearchFilters from "../components/SearchFilters";
import UserCard from "../components/UserCard";

export default {
  components: {
    SearchFilters,
    UserCard
  },
  data() {
    return {
      id: localStorage.getItem("id"),
      users: [],
      gender: "",
      interests: "",
      distance: "",
      agerange: [],
      pop: "",
      displayedUsers: [],
      lat: 0.0,
      long: 0.0,
    };
  },
  async created() {
    await this.getPrefs();
    await this.getAllUsers();
    this.displayedUsers = this.users;
  },
  methods: {
    filterResult(params) {
      this.displayedUsers = [];
      if (params.interests == "Both")
      {
        for (let i = 0; i < this.users.length; i++)
        {
            if (this.users[i].age >= params.minage && this.users[i].age <= params.maxage)
              if (this.users[i].popularity >= params.pop)
                if (this.users[i].dist <= params.distance)
                  this.displayedUsers.push(this.users[i]); // rajouter le filtre de km
        }
      }
      else
      {
        for (let i = 0; i < this.users.length; i++)
        {
          if (params.interests === this.users[i].gender)
            if (this.users[i].age >= params.minage && this.users[i].age <= params.maxage)
              if (this.users[i].popularity >= params.pop)
                if (this.users[i].dist <= params.distance)
                  this.displayedUsers.push(this.users[i]); // rajouter le filtre de km
        }
      }
  //    console.log(params);
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    },
    displayUsers() {
      console.log(this.users);
    },
    displayMe() {
      console.log({id:this.id, gender:this.gender, interests:this.interests, distance:this.distance, pop:this.pop, lat:this.lat, long:this.long});
    },
    async getAllUsers() {
      try {
        const res = await axios.post("http://localhost:8001/getAllUsers/", {
          id: this.id
        });
        this.users = res.data.people_list;
        this.calculateAge();
        this.calculateDist();
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
    calculateAge() {
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].age = 10;
        let date = this.users[i].birthdate.split("T")[0];
        this.users[i].age = this.getAge(date);
      }
    },
    calculateDist() {
        for (let i = 0; i < this.users.length; i++) {
          let test = JSON.parse(this.users[i].position);
          this.users[i].lat = test.latitude;
          this.users[i].long = test.longitude;
          this.users[i].dist = this.getDist(this.lat, this.long, test.latitude, test.longitude, 'K');
        }
    },
    getDist(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
    }
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
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