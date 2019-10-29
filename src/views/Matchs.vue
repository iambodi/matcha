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
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-btn icon @click.stop="chat=true">
                  <v-icon color="grey darken-1">mdi-comment-text-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <Chats v-model="chat" />
  </v-row>
</template>

<script>
import Chats from "../components/Chats";

export default {
  data() {
    return {
      chat: false,
      password: "Password",
      show: false,
      marker: true,
      id: localStorage.getItem("id"),
    //   id_user_matched: [],
      items: [
        { header: "Your last interractions" },
        {
          action: "15 min",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Thibaud Martin",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          action: "15 min",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "Emilie Desvosges",
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        }
      ]
    };
  },
  mounted() {
    this.getMatch();
  },
  components: {
    Chats
  },
  methods: {
    async getMatch() {
      try {
        const res = await axios.get(
          "http://localhost:8001/chat/" + this.id, {});
        for (let i = 0; i < res.data.matches_list.length; i++) {
          const id_user_matched = res.data.matches_list[i].id_user_matched;
          
          try {
            const res = await axios.get("http://localhost:8001/setting/" + id_user_matched, {});
          
            try {
                const res = await axios.get("http://localhost:8001/loadConversation/" + id_user_matched, {});
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
    }
  }
};
</script>

