<template>
  <v-container v-if="!logged" fluid fill-height justify-center align-center>
    <Login v-on:loggingSuccess="loggedIn" v-on:alertMsg="fireAlert" />
  </v-container>
  <v-container v-else>
    <Navbar :notifs="notifs" v-on:lookNotifs="cleanNotifs" v-on:loggingOutSuccess="loggedOut"/>
    <router-view v-on:alertMsg="fireAlert" :socket="socket"></router-view>
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
      socket: io("localhost:3000"),
      notifs: [],
    };
  },
  created () {
    document.addEventListener('beforeunload', this.loggedOut);
    this.socket.on("receive notif", (data) => {
      this.getNotifs(this.id)
    });
    this.logged = localStorage.getItem('logged') === "true" ? true : false;
    this.id = localStorage.getItem('id');
  },
  mounted () {
  },
  components: {
    Register,
    Login,
    Navbar
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
        }
        invocation.send();
      }
    },
    loggedIn(userId) {
      this.id = userId;
      this.logged = true;
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
      let value = userId+"_user"
      this.socket.emit('join userroom', value)
      this.getNotifs(userId);
    },
    async getNotifs(userId) {
      const res = await axios.get("http://localhost:8001/getNotifications/" + userId, {})
      this.notifs = res.data.notifications;
    },
    cleanNotifs() {
      for (let i = 0; i < this.notifs.length; i++) {
        axios.get("http://localhost:8001/deleteNotifications/" + this.notifs[i].id_notif)
      }
    },
    loggedOut()
    {
      axios.post("http://localhost:8001/getUserOnline", {
        userId: this.id,
        online: 0,
      });
      axios.post("http://localhost:8001/saveLastConnection", {
        userId: this.id,
      });
      this.id = -1;
      this.logged = false;
      localStorage.setItem('logged', false);
      localStorage.setItem('token', "");
      localStorage.setItem('id', -1);  
    },
    fireAlert(state, message) {
      this.$emit("alertMsg", state, message);
    },
  }
};
</script>
