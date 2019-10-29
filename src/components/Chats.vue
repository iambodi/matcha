<template>
  <v-col v-model="show" class="grey lighten-5">
    <v-toolbar color="deep-orange lighten-1" dark></v-toolbar>
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="text"
              :append-outer-icon="'mdi-send'"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
    //   show: false,
      text: "Hey!",
      marker: true
    };
  },
//    mounted() {
//         this.socket.on('MESSAGE', (data) => {
//             this.messages = [...this.messages, data];
//         });
//     },
  methods: {
    clearMessage() {
      this.message = "";
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
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
  },

};
</script>