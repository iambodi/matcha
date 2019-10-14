<template>
<v-row>
<v-col cols="12" sm="6" md="4" lg="4" xl="4" >


  <v-card flat>

    <v-card-text>
      <div class="title text--primary">Looking for</div>

      <v-select
        :items="items"
        :menu-props="{ top: true, offsetY: true }"
        label="Looking For"
      ></v-select>
    </v-card-text>

    <v-subheader>Distance</v-subheader>
    <v-card-text>
      <v-slider
        track-color="grey"
        thumb-color="deep-orange"
        color="deep-orange"
        thumb-label="always"
      ></v-slider>
    </v-card-text>
<v-subheader>Age</v-subheader>
    <v-card-text>
      <v-range-slider
        v-model="value1"
        track-color="grey"
        thumb-color="deep-orange"
        color="deep-orange"
        thumb-label="always"
      ></v-range-slider>
    </v-card-text>
<v-subheader>Popularity</v-subheader>
    <v-card-text>
      <v-slider
        thumb-label="always"
        track-color="grey"
      ></v-slider>
    </v-card-text>
  </v-card>
  </v-col>
  <v-col>
      <v-card max-width="400">
<v-card-text flat>
      <div class="title text--primary">Tags</div>
      <v-chip-group
        v-model="selection"
        column
        multiple
        active-class='deep-orange lighten-1 white--text'>
        <v-chip
        v-for="(tag, i) in tags"
        :key="i"
        @click="check(tag)"> {{ tag }}
        </v-chip>
      </v-chip-group>
                  <p>Data : {{ selected}} </p>

    </v-card-text>

    </v-card>
  </v-col>
</v-row>

</template>

<script>
  export default {
    data () {
      return {
        active: false,
        tags: ['Netflix & chill', 'Adventurer', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Romantic', 'Gamer'],
        value1: [30, 60],
        items: ['Male', 'Female', 'Non-binary'],
        selected : [],
      }
      
    },
    methods : {
          check (tag) {
            if (this.selected.includes(tag)){
                var index = this.selected.indexOf(tag);                
                    this.selected.splice(index, 1);
            }
            else
                this.selected.push(tag);
          }
      }
  }
</script>