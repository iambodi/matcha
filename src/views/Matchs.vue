<template>
  <v-row no-gutters>
    <v-col cols="12" md="5" sm="5" lg="6" xl="6">
      <v-card height="600" class="mx-auto">
        <v-toolbar color="deep-orange lighten-1" dark>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-item v-else :key="item.name">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-btn @click.stop ="dislikeUser(item)" icon>
                  <v-icon color="grey darken-1">mdi-heart-broken-outline</v-icon>
                </v-btn>
                <v-btn icon @click.stop="select(item.index)">
                  <v-icon color="grey darken-1">mdi-comment-text-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <Chats v-model="chat"
    v-on:newMsg="postMsg"
      :msg="msg"
      :id_match="selectedId"
      :index="selected"/>
  </v-row>
</template>

<script>
import Chats from "../components/Chats";

export default {
  props: {
    socket: Object,
  },
  data() {
    return {
      msg: [],
      chat: false,
      password: "Password",
      show: false,
      marker: true,
      id: localStorage.getItem("id"),
      avatar: "",
    //   action: "",
      name: "",
      subtitle: "",
      items: [{ header: "Your last interractions" }],
      matchs: [],
      selected: -1,
      // socket: io("localhost:3000"),
      selectedId: -1,
    };
  },
  async created() {
    await this.getMatch();
    if (this.matchs.length !== 0) {
    this.joinRooms();
    this.socket.on("receive message", data => {
    //   this.msg = [...this.text, data];
    for (var i = 0; i < this.matchs.length; i++) {
        if (this.matchs[i].id_match === data.id_match)
            break;
    }
        if (this.matchs.length !== 0) {
            this.matchs[i].message.push(data)
        }
    });
    }
  },
  components: {
    Chats
  },
  methods: {
      joinRooms () {
        for (let i = 0; i < this.matchs.length; i++){
        this.socket.emit('join room', this.matchs[i].id_match)
        }
      },
      postMsg(id_match, obj) {
          this.socket.emit('send message', {...obj, user:this.id})
          this.socket.emit('send notif', {user: this.matchs[this.selected].id_user_matched, type:6})
          axios.post("http://localhost:8001/addNotification", {id_user:this.matchs[this.selected].id_user_matched, id_user_:this.id, notif:6})
      },
      async dislikeUser(item) {
        // console.log(this.matchs[item.index])
        axios.get("http://localhost:8001/removeMatch/" + this.matchs[item.index].id_match, {})
        this.matchs.splice(this.index, 1);
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].index === item.index)
            break;
        }
        this.items.splice(i, 1);
        this.$emit('alertMsg', "success", "Succesfully disliked user !")
      },
      addMsg (id_match, obj){
          this.matchs[id_match].message.push(obj);
      },
      select(index)
      {
          this.selected = index;
          this.msg = this.matchs[this.selected].message;
          this.selectedId = this.matchs[this.selected].id_match;
      },
    async getMatch() {
      try {
        const res = await axios.get("http://localhost:8001/chat/" + this.id, {});
        this.matchs.push(...res.data.matches_list)
        if (this.matchs.length == 0) {
          return ;
        }
        for (let i = 0; i < res.data.matches_list.length; i++) {
          const id_user_matched = res.data.matches_list[i].id_user_matched;
          const id_match = res.data.matches_list[i].id_match;
          //   console.log(res.data.matches_list[i].id_match);s
          try {
            const res = await axios.get(
              "http://localhost:8001/getProfilePhoto/" + id_user_matched, {});
            this.avatar = res.data.photo;
          } catch (error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
          }
          try {
            const res = await axios.get(
              "http://localhost:8001/setting/" + id_user_matched, {} );

            const myDate = new Date(res.data.user[0].last_connected);
            const date = res.data.user[0].last_connected;
            const month = (date.substring(5,10));
            const hour = (date.substring(11,16));
            this.action = month + " " + hour;
            this.name = res.data.user[0].firstname + " " + res.data.user[0].lastname;
            this.items.push({ divider: true, inset: true });
            try {
              const res = await axios.get(
                "http://localhost:8001/loadConversation/" + id_match, {} );
                this.matchs[i].message = res.data.messageArray;
              //  this.msg = this.matchs[0].message;
                // console.log(this.msg)
              if (res.data.messageArray.length > 0) {
                let ii = 0;
                //   console.log(res.data);
                while (ii < res.data.messageArray.length) {
                //   console.log(res.data.messageArray[i].message);
                  ii++;
                }
                if (ii !== 0) {
                  this.items.push({ avatar: this.avatar, action: this.action, name: this.name, subtitle: res.data.messageArray[ii - 1].message , index: i});
                }
              } else
                this.items.push({ avatar: this.avatar, action: this.action, name: this.name, index: i});
            } catch (error) {
              this.$emit("alertMsg", "fail", "Error, please retry");
            }
          } catch (error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
          }
        }
        
      } catch (error) {
        this.$emit("alertMsg", "fail", "Error, please retry");
      }
    //   console.log(this.items)
    }
  }
};
</script>