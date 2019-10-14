<template>
  <div class="about">
    <v-row justify="start">
    <v-col cols="12" md="6" lg="6" xl="6">
      <v-card
    elevation="15"
    max-width="444"
    class=" deep-orange lighten-1"
  >
    <v-system-bar lights-out></v-system-bar>
    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="true"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="300"
    >
      <v-carousel-item
        v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      >
      </v-carousel-item>
    </v-carousel>
    <v-list two-line>
      <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
  ></v-file-input>
    </v-list>
  </v-card>
    </v-col>
  
<v-row>
<v-col cols="12">
<v-card
    elevation="15"
    class="mx-auto"
    :loading="loading"
    max-width="600"
  >
    <v-card-title class="deep-orange lighten-1 white--text">About you</v-card-title>
    <v-card-text>
      <v-col cols="12" sm="6">
                <v-autocomplete
                    label="Gender"
                    :items="gender"
                ></v-autocomplete>
              </v-col>
      <div class="my-4 subtitle-1 black--text">
        Write something about yourself:
      </div>
<v-textarea
      counter
      label="Bio"
      :rules="rules"
      :value="value"
    ></v-textarea>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div class="title text--primary">Tags</div>
      <v-chip-group
        v-model="selection"
        active-class="deep-orange lighten-1 white--text"
        column
      >
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
</v-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: ['Netflix & chill', 'Adventurer', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Romantic', 'Gamer'],
      selected : [],
      rules: [v => v.length <= 255 || 'Max 255 characters'],
      value: 'Hello!',
      gender : ['Male', 'Female', 'Non-binary'],
      cycle: false,
      items: [
        {
          src: 'https://i.ytimg.com/vi/LBDSrUFfGHI/maxresdefault.jpg',
        },
        {
          src: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg'
        },
      ],
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