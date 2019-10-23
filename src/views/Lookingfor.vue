<template>
<v-row>
<v-col cols="12" sm="6" md="4" lg="4" xl="4" >


  <v-card flat>

    <v-card-text>
      <div class="title text--primary">Looking for</div>

      <v-select
        v-model="interests"
        :items="items"
        :menu-props="{ top: true, offsetY: true }"
        label="Looking For"
      ></v-select>
    </v-card-text>

    <v-subheader>Distance</v-subheader>
    <v-card-text>
      <v-slider
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
        min=18
        track-color="grey"
        thumb-color="deep-orange"
        color="deep-orange"
        thumb-label="always"
      ></v-range-slider>
    </v-card-text>
<v-subheader>Popularity</v-subheader>
    <v-card-text>
      <v-slider
        v-model="pop"
        thumb-label="always"
        track-color="grey"
      ></v-slider>
    </v-card-text>
  </v-card>
       <v-btn @click="updatePrefs">Update Prefs</v-btn>
  </v-col>
  <v-col>
      <v-card max-width="400">
<v-card-text flat>
      <div class="title text--primary">Tags</div>
      <v-chip-group
        column
        multiple
        active-class='deep-orange lighten-1 white--text'
        v-model="selectedNumber">
        <v-chip
        v-for="(tag, i) in tags"
        :key="i"
        @click="check(tag)"> {{ tag }}
        </v-chip>
      </v-chip-group>
                  <!-- <p>Data : {{ selected }} </p> -->

    </v-card-text>

    </v-card>
  </v-col>
</v-row>
</template>

<script>
  export default {
    data () {
      return {
        bio: "",
        gender: "",
        interests: "Both",
        distance: 0,
        pop: 0,
        id: localStorage.getItem('id'),
        active: false,
        tags: ['Netflix & chill', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Adventurer'],
        agerange: [18, 99],
        items: ['Male', 'Female', 'Both'],
        selectedNumber: [],
        selected : [],
      }
      
    },
    mounted() {
      this.getPrefTags();
      this.getPrefs();
    },
    methods : {
          check (tag) {
            if (this.selected.includes(tag)){
                var index = this.selected.indexOf(tag);                
                    this.selected.splice(index, 1);
                axios.get("http://localhost:8001/removePrefTag/" + this.id + "/" + (this.tags.indexOf(tag) + 1), {})

            }
            else
            {
                this.selected.push(tag);
                axios.post("http://localhost:8001/addPrefTag/", {id_user:this.id, id_tag:(this.tags.indexOf(tag) + 1)}) // a voir si ca marche
            }
          },
          async getPrefTags(){
            try {
              const res = await axios.get("http://localhost:8001/getPreferenceTags/" + this.id, {});
              if (res.data && res.data.prefTags && res.data.prefTags.length > 0) {
             //     console.log(res.data.prefTags);
                    for (var i = 0; i < res.data.prefTags.length; i++) {
                      this.selected.push(this.tags[(res.data.prefTags[i].id_tag - 1)]);
                      this.selectedNumber.push(res.data.prefTags[i].id_tag - 1);
                    }
              }
            } catch (error) {
              this.resText = 'Error, please retry';
              }
          },
          async getPrefs() {
            try {
            const res2 = await axios.get("http://localhost:8001/setting/" + this.id, {});
              if (res2.data && res2.data.user && res2.data.user.length != 0)
              {
                let user = res2.data.user[0];
                this.bio = user.bio;
                this.gender = user.gender;
                this.interests = user.interest;
                this.distance = user.distance;
                this.agerange = [user.minage, user.maxage]
                this.pop = user.pop; // voir si c'est vraiment pop ou popularity
              }
      //        console.log(res2);
            } catch (error) {
        //      console.log("error")
              this.resText = 'Error, please retry';
            }
          },
          updatePrefs(){
            axios.post("http://localhost:8001/updatePreferences", {bio:this.bio, gender:this.gender, interest:this.interests, distance:this.distance, minage:this.agerange[0], maxage:this.agerange[1], pop:this.pop, id:this.id})

          }
      }
  }
</script>