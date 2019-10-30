<template>
  <div>
    <v-card class="text-center">
      <v-card-title class="deep-orange lighten-1 white--text mb-4">Change Filters</v-card-title>
      <v-card-text>
        <v-select
          v-model="interests"
          :items="items"
          :menu-props="{ top: true, offsetY: true }"
          label="Looking For"
        ></v-select>
      </v-card-text>

      <v-card-text>
        <v-select
          v-model="interestsAttirance"
          :items="itemsInterested"
          :menu-props="{ top: true, offsetY: true }"
          label="Who are interrested in"
        ></v-select>
      </v-card-text>

      <v-subheader>Distance</v-subheader>
      <v-card-text>
        <v-slider
          min="0"
          max="1000"
          v-model="distance"
          track-color="grey"
          thumb-color="deep-orange"
          color="deep-orange"
          thumb-label="always"
        ></v-slider>
      </v-card-text>
      <v-subheader>Age</v-subheader>
      <v-card-text>
        <v-range-slider
          v-model="agerange"
          min="18"
          track-color="grey"
          thumb-color="deep-orange"
          color="deep-orange"
          thumb-label="always"
        ></v-range-slider>
      </v-card-text>
      <v-subheader>Popularity</v-subheader>
      <v-card-text>
        <v-slider v-model="pop" thumb-label="always" track-fill-color="grey" track-color="blue darken-2"></v-slider>
      </v-card-text>

      <v-divider></v-divider>

        <v-card-text>
                <v-chip-group
                    column
                    multiple
                    active-class='deep-orange lighten-1 white--text'
                    v-model="selectedNumber"
                >
                <v-chip
                    v-for="(tag, i) in tags"
                    :key="i"
                    @click="check(tag)"
                > 
                    {{ tag }}
                </v-chip>
                </v-chip-group>
        </v-card-text>
      <v-divider></v-divider>
    
      <v-row
        class="px-2 ma-2"
        justify="space-between"
      >
        <v-btn-toggle
          v-model="sortType"
        >
          <v-btn color="white">
            <v-icon>mdi-sort-alphabetical</v-icon>
          </v-btn>
  
          <v-btn color="white">
            <v-icon>mdi-cake-variant</v-icon>
          </v-btn>
  
          <v-btn color="white">
            <v-icon>mdi-car-side</v-icon>
          </v-btn>
  
          <v-btn color="white">
              <v-icon class="cols 12">mdi-star-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
   
        <v-btn-toggle v-model="sortOrder">
          <v-btn color="white">
            <v-icon>mdi-sort-ascending</v-icon>
          </v-btn>
  
          <v-btn color="white">
            <v-icon>mdi-sort-descending</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-divider></v-divider>
        <v-row
        class="ma-2"
        justify="center"
        >
<input type="checkbox" id="checkbox" v-model="onlyShowOnline">
<label for="checkbox">{{ "Only Show online users" }}</label>

        </v-row>
      <v-divider></v-divider>
        <v-row
        class="ma-2"
        justify="center"
        >
            <v-btn class="mb-2" block @click="applyFilters">Apply Filters</v-btn>
        </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sortType: "",
      sortOrder: "",
      gender: "",
      interests: "Both",
      interestsAttirance: "Both",
      distance: 0,
      pop: 0,
      id: localStorage.getItem("id"),
      tags: [
        "Netflix & chill",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
        "Adventurer"
      ],
      agerange: [18, 99],
      items: ["Male", "Female", "Both"],
      itemsInterested:["Male", "Female", "Both", "Whatever"],
      selectedNumber: [],
      selected: [],
      onlyShowOnline: false,
    };
  },
  mounted() {
    this.getPrefs();
    this.getPrefTags();
  },
  methods: {
    check (tag) {
        if (this.selected.includes(tag)){
            var index = this.selected.indexOf(tag);                
            this.selected.splice(index, 1);
        }
        else
        {
            this.selected.push(tag);
        }
    },
    applyFilters () {
        this.$emit('applyFilters', 
        {
            gender:this.gender,
            interests:this.interests,
            interestsAttirance:this.interestsAttirance,
            distance:this.distance,
            pop:this.pop,
            minage:this.agerange[0],
            maxage:this.agerange[1],
            tags:this.selected,
            onlyShowOnline:this.onlyShowOnline,
        })
        if (this.sortType !== "" && this.sortOrder !== "")
          this.$emit('applyOrder', {
            type: this.sortType,
            order: this.sortOrder,
          })
    },
    async getPrefs() {
      try {
        const res2 = await axios.get(
          "http://localhost:8001/setting/" + this.id,
          {}
        );
        if (res2.data && res2.data.user && res2.data.user.length != 0) {
          let user = res2.data.user[0];
          this.gender = user.gender;
          this.interests = user.interest;
          this.distance = user.distance;
          this.agerange = [user.minage, user.maxage];
          this.pop = user.pop; // voir si c'est vraiment pop ou popularity
        }
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    },
    async getPrefTags(){
        try {
            const res = await axios.get("http://localhost:8001/getPreferenceTags/" + this.id, {});
            if (res.data && res.data.prefTags && res.data.prefTags.length > 0) {
                for (var i = 0; i < res.data.prefTags.length; i++) {
                    this.selected.push(this.tags[(res.data.prefTags[i].id_tag - 1)]);
                    this.selectedNumber.push(res.data.prefTags[i].id_tag - 1);
                }
            }
        } catch (error) {
            this.$emit('alertMsg', "fail", "Error, please retry")
        }
    },
    updatePrefs() {
      axios.post("http://localhost:8001/updatePreferences", {
        gender: this.gender,
        interest: this.interests,
        distance: this.distance,
        minage: this.agerange[0],
        maxage: this.agerange[1],
        pop: this.pop,
        tags:this.selected,
      });
    }
  }
};
</script>