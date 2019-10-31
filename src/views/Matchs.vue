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
      :msg="msg"/>
  </v-row>
</template>

<script>
import Chats from "../components/Chats";

export default {
  data() {
    return {
      msg: [],
      chat: false,
      password: "Password",
      show: false,
      marker: true,
      id: localStorage.getItem("id"),
      avatar: "",
      action: "",
      name: "",
      subtitle: "",
      items: [{ header: "Your last interractions" }],
      matchs: [],
      selected: -1,
    };
  },
  mounted() {
    this.getMatch();
  },
  components: {
    Chats
  },
  methods: {
      select(index)
      {
        //   console.log(index)
          this.selected = index;
          this.msg = this.matchs[this.selected].message;
       //   console.log(this.msg)
      },
    async getMatch() {
        console.log("MATCHS :", this.matchs)
      try {
        const res = await axios.get("http://localhost:8001/chat/" + this.id, {});
        this.matchs.push(...res.data.matches_list)
        for (let i = 0; i < res.data.matches_list.length; i++) {
          const id_user_matched = res.data.matches_list[i].id_user_matched;
          const id_match = res.data.matches_list[i].id_match;
          //   console.log(res.data.matches_list[i].id_match);s
          try {
            const res = await axios.get(
              "http://localhost:8001/getProfilePhoto/" + id_user_matched, {});
            this.avatar = res.data.photo;
          } catch (error) {
            console.log(error);
            this.$emit("alertMsg", "fail", "Error, please retry");
          }
          try {
            const res = await axios.get(
              "http://localhost:8001/setting/" + id_user_matched, {} );
            this.action = res.data.user[0].last_connected;
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
              console.log(error);
              this.$emit("alertMsg", "fail", "Error, please retry1");
            }
          } catch (error) {
            console.log(error);
            this.$emit("alertMsg", "fail", "Error, please retry2");
          }
        }
        
      } catch (error) {
        console.log(error);
        this.$emit("alertMsg", "fail", "Error, please retry3");
      }
    //   console.log(this.items)
    }
  }
};
</script>