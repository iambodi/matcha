<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card left>
      <v-card-title class="deep-orange lighten-1 white--text" primary-title>Notifications</v-card-title>
      <v-card-text>
        <div>
          <p v-if="isConnected">We're connected to the server!</p>
          <p>Message from server: "{{socketMessage}}"</p>
          <button @click="pingServer()">Ping Server</button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isConnected: false,
    socketMessage: "",
    value: Boolean
  },
  mounted() {
    // this.connect();
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    notification() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    }
  },

  methods: {
    // receive (obj) {
    // if (obj && obj.to === +localStorage.getItem('userId')) {
    //   this.notifications.unshift(obj);
    //   if (obj.notif === 1) {
    //     this.messageService.add({
    //       severity: 'info', summary: 'New notification', detail: 'Somebody saw your profile', life: 6000,
    //     });
    //   }
    //   if (obj.notif === 2) {
    //     this.messageService.add({
    //       severity: 'warn', summary: 'New notification', detail: 'someone deleted you', life: 6000
    //     });
    //   }
    //   if (obj.notif === 3) {
    //     this.messageService.add({
    //       severity: 'warn', summary: 'New notification', detail: 'someone reported you', life: 6000
    //     });
    //   }
    //   if (obj.notif === 4) {
    //     this.messageService.add({
    //       severity: 'info', summary: 'New notification', detail: 'Someone like you', life: 6000
    //     });
    //   }
    //   if (obj.notif === 5) {
    //     this.messageService.add({
    //       severity: 'info', summary: 'New notification', detail: 'You\'ve got a match', life: 6000
    //     });
    //   }
    //   if (obj.notif === 6) {
    //     this.nbMessages++;
    //     this.messageService.add({
    //       severity: 'info', summary: 'New message', detail: 'You\'ve got a message' , life: 6000
    //     });
    //   }
    // }
  // },
    // connect() {
    //   try {
    //     this.socket = io.connect("http://localhost:5000");
    //     this.socket.on("receive notifications", this.receive);
    //     console.log('OK');
    //   } catch (e) {
    //     console.log("Could not connect socket.io");
    //   }
    // },
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