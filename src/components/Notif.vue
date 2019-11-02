<template>
  <v-dialog v-model="show" max-width="400px">
    <template v-for="(notif, index) in notifs">
    <v-card left v-bind:key="index">
      <v-card-title class="deep-orange lighten-1 white--text" primary-title>Notifications</v-card-title>
      {{notif.firstname + " " + notif.lastname}} {{notif.notif===6 ? " Sent you a message" : notif.notif===5 ? " Matched with you !" : notif.notif===4 ? " liked you !" : notif.notif ===1 ? " Viewed your profile !" : " did sommething !"}}
      <v-card-text>
      </v-card-text>
    </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    notifs: Array,
    isConnected: false,
    socketMessage: "",
    value: Boolean
  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("pingServer", "PING!");
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>