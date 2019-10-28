<template>
  <v-col>
    <v-row justify="center">
      <SearchFilters v-on:applyFilters="filterResult"/>
      <v-btn @click="displayUsers">display users</v-btn>
    </v-row>
    <UserCard v-for="(user, i) in displayedUsers" :key="i" :user="user"/>
  </v-col>
</template>


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
    };
  },
  async created() {
    await this.getAllUsers();
    await this.getPrefs();
    this.displayedUsers = this.users;
  },
  methods: {
    filterResult(params) {
      this.displayedUsers = [];
      if (params.interests == "Both")
      {
        for (let i = 0; i < this.users.length; i++)
        {
          if (this.users[i].interest === "Both" || this.users[i].interest === params.gender)
            if (this.users[i].age >= params.minage && this.users[i].age <= params.maxage)
              if (this.users[i].popularity >= params.pop)
                this.displayedUsers.push(this.users[i]); // rajouter le filtre de km
        }
      }
      else
      {
        for (let i = 0; i < this.users.length; i++)
        {
          if (params.interests === this.users[i].gender && (this.users[i].interest === "Both" || this.users[i].interest === params.gender))
            if (this.users[i].age >= params.minage && this.users[i].age <= params.maxage)
              if (this.users[i].popularity >= params.pop)
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
    async getAllUsers() {
      try {
        const res = await axios.post("http://localhost:8001/getAllUsers/", {
          id: this.id
        });
        this.users = res.data.people_list;
        this.calculateAge();
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
        }
      } catch (error) {
        this.$emit("alertMsg", "fail", "Error, please retry");
      }
    }
  }
};
</script>