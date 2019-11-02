<template>
  <v-card-text>
    <div class="title text--primary">Tags</div>
    <v-chip-group
      active-class="deep-orange lighten-1 white--text"
      column
      multiple
      v-model="selectedNumber"
    >
      <v-chip v-for="(tag, i) in tags" :key="i" @click="check(tag)">{{ tag }}</v-chip>
    </v-chip-group>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      tags: [
        "Netflix & chill",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
        "Aventurer"
      ],
      selected: [],
      selectedNumber: [],
      items: []
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    async check(tag) {
      if (this.selected.includes(tag)) {
        var index = this.selected.indexOf(tag);
        this.selected.splice(index, 1);
        axios.get(
          "http://localhost:8001/removeUserTag/" +
            this.id +
            "/" +
            (this.tags.indexOf(tag) + 1),
          {}
        );
      } else {
        this.selected.push(tag);
        const res = await axios.post("http://localhost:8001/addUserTag/", {
          id_user: this.id,
          id_tag: this.tags.indexOf(tag) + 1
        });
      }
    },
    async getTags() {
      try {
        const res = await axios.get(
          "http://localhost:8001/getUserTags/" + this.id,
          {}
        );
        if (res.data && res.data.userTags && res.data.userTags.length > 0) {
          for (var i = 0; i < res.data.userTags.length; i++) {
            this.selected.push(this.tags[res.data.userTags[i].id_tag - 1]);
            this.selectedNumber.push(res.data.userTags[i].id_tag - 1);
          }
        }
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    }
  }
};
</script>