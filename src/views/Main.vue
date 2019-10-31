<template>
  <v-container v-if="!logged" fluid fill-height justify-center align-center>
    <Login v-on:loggingSuccess="loggedIn" v-on:alertMsg="fireAlert" />
  </v-container>
  <v-container v-else>
    <Navbar v-on:loggingOutSuccess="loggedOut"/>
    <router-view v-on:alertMsg="fireAlert"></router-view>
  </v-container>
</template>



<script>
import io from "socket.io-client";
import Register from "../components/Register";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

export default {
  data() {
    return {
      id: -1,
      logged: false,
      loading: false,
      actions: true,
      tags: [
        "Netflix & chill",
        "Adventurer",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
      ],
      selected: [],
      // socket: io("localhost:5000")
    };
  },
  created () {
    document.addEventListener('beforeunload', this.loggedOut);
  },
  components: {
    Register,
    Login,
    Navbar
    //Notifs
  },
  methods: {
    getGeolocFromIP(userId) {
      const url = "http://ip-api.com/json/";
      const invocation = new XMLHttpRequest();

      if (invocation){
        invocation.open('GET', url, true);
        invocation.onreadystatechange = () => {
          if (invocation.readyState === 4 && invocation.status === 200) {
            const jsonres = JSON.parse(invocation.response)
            axios.post("http://localhost:8001/updateGeolocation", {
              id_user: userId,
              latitude: jsonres.lat,
              longitude: jsonres.lon,
            })
          }
          // else {
          //   console.log()
          //   this.$emit("alertMsg", 'fail', "couldn't join the tracking api") // jarrive pas a lancer ca
          // }
        }
        invocation.send();
      }
    },
    loggedIn(userId) {
      this.id = userId;
      this.logged = true;       // IF USER DOESNT HAVE POSITION LETS DO THIS
      if (!(navigator.geolocation)){
        this.getGeolocFromIP(userID);       
      }
      else {
        navigator.geolocation.getCurrentPosition(function(position) {
          axios.post("http://localhost:8001/updateGeolocation", {
            id_user: userId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          },
          this.getGeolocFromIP(userId)
        );
      }
    },
    loggedOut()
    {
      this.id = -1;
      this.logged = false; // penser a faire la requete qui delog et enregistre la derniere heure de connection
      axios.post("http://localhost:8001/getUserOnline", {
        userId: this.id,
        online: 0,
      });
      axios.post("http://localhost:8001/saveLastConnection", {
        userId: this.id,
      });
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    },
  }
};
</script>
