<template>
  <v-col v-model="show" class="grey lighten-5" v-if="id_match !== -1">
    <v-toolbar color="deep-orange lighten-1" dark></v-toolbar>
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-container style="max-height:400px" class="overflow-y-auto">
              <div v-for="(mess, i) in msg" :key="i">
                <v-text-field
                  v-if="test(mess)"
                  filled
                  readonly
                  rounded
                  v-model="mess.message"
                  dense
                  background-color="deep-orange lighten-2"
                ></v-text-field>
                <v-text-field
                  v-else
                  filled
                  readonly
                  rounded
                  v-model="mess.message"
                  dense
                  background-color="grey lighten-2"
                ></v-text-field>
              </div>
            </v-container>
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
// import io from "socket.io-client";

export default {
  data() {
    return {
      //   show: false,
      text: "Hey!",
      marker: true,
      id: parseInt(localStorage.getItem("id")),
    //   socket: io("localhost:5000"),
      message: ""
    };
  },
  mounted() {
    
  },
  props: {
    msg: Array,
    index: Number,
    id_match: Number,
  },
  methods: {
    sendSocket() {
      this.socket.emit("notification", {
        user: this.id,
        message: this.text,
        id_match: this.id_match
      });
      this.message = "";
    },
    test(mess) {
      if (mess.id_user === this.id) {
        return true;
      }
      return false;
    },
    clearMessage() {
      this.text = "";
    },
    async sendMessage() {
      // console.log("sendmsg:", this.msg);
      try {

        const res = await axios.post("http://localhost:8001/saveMessage", {
          idUser: this.id,
          message: this.text,
          idMatch: this.id_match
        });
        let tmp = {id_match: this.id_match, id_user: this.id, message:this.text}
        this.$emit("newMsg", this.index, tmp);
        this.sendSocket();
      } catch (error) {
        this.$emit("alertMsg", "fail", "Error, please retry1");
      }
      this.clearMessage();
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