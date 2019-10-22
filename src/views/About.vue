<template>
  <div class="about">
    <v-row justify="start">
    <v-col cols="12" md="6" lg="6" xl="6">
      <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
        <div class="text-center"><span>{{resText}}</span></div>
      </v-snackbar>
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
    max-width="600"
  >
    <v-card-title class="deep-orange lighten-1 white--text">About you</v-card-title>
    <v-card-text>
      <v-col cols="12" sm="6">
                <v-select
                    label="Gender"
                    :items="gender"
                ></v-select>
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
        active-class="deep-orange lighten-1 white--text"
        column
        multiple
      >
        <v-chip
        v-model="tag1"
        @click="check('Netflix & Chill')"> Netflix & Chill
        </v-chip>
        <v-chip
        v-model="tag2"
        @click="check('Athletic')"> Athletic
        </v-chip>
        <v-chip
        active
        v-model="tag3"
        @click="check('Gastronomy')"> Gastronomy
        </v-chip>
        <v-chip
        v-model="tag4"
        @click="check('Nature Lovers')"> Nature Lovers
        </v-chip>
        <v-chip
        v-model="tag5"
        @click="check('Nightlife')"> Nightlife
        </v-chip>
        <v-chip
        v-model="tag6"

        @click="check('Adventurer')"> Adventurer
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
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
      id: localStorage.getItem('id'),
      tags: ['Netflix & chill', 'Athletic', 'Gastronomy', 'Nature lovers', 'Nightlife', 'Aventurer'],
      selected : Array(),
      rules: [v => v.length <= 255 || 'Max 255 characters'],
      value: 'Hello!',
      gender : ['Male', 'Female'],
      cycle: false,
      snackbar: false,
      resText : "",
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
    
    mounted () {
      this.getTags();
      // console.log(this.selected)
      },

    methods : {
      async submit() {
      try {
        this.snackbar = true;
        const res = await axios.post("http://localhost:8001/login", {
          email: this.login.email,
          password: this.login.pwd
        });
        this.resText = res.data.message;
        // console.log(res.data);
        if (res.data.success === true){
          localStorage.setItem('logged', true);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('id', res.data.user_id);          
          window.location = 'http://localhost:8080'
        }
      } catch (error) {
        this.resText = 'Error, please retry';
      }
    },
      getTags : async function () {
        try {
          const res = await axios.get("http://localhost:8001/getUserTags/" + this.id, {});
          // console.log(res.data);
          this.selected = [];
          this.tag1 = false;
          this.tag2 = false;
          this.tag3 = false;
          this.tag4 = false;
          this.tag5 = false;
          this.tag6 = false;
          for (var i = 0; i < res.data.userTags.length; i++) {
            this.selected.push(res.data.userTags[i].tag);
          if (res.data.userTags[i].tag === 'Netflix & Chill')
            this.tag1 = true;
          if (res.data.userTags[i].tag === 'Athletic')
            this.tag2 = true;
          if (res.data.userTags[i].tag === 'Gastronomy')
            this.tag3 = true;
          if (res.data.userTags[i].tag === 'Nature Lovers')
            this.tag4 = true; 
          if (res.data.userTags[i].tag === 'Nightlife')
            this.tag5 = true;
          if (res.data.userTags[i].tag === 'Adventurer')
            this.tag6 = true;
          }
        } catch (error) {
          this.resText = 'Error, please retry0';
        }
      },
      check (tag) {
        if (this.selected.includes(tag)){
          // console.log("contains " + tag);
            var index = this.selected.indexOf(tag);                
            this.selected.splice(index, 1);
            this.removeUserTag(tag);
                    // console.log(this.selected);
  //          return false;
        }
        else {
          // console.log("does not contains " + tag);
            this.selected.push(tag);
            this.addUserTag(tag);
                    // console.log(this.selected);
    //        return true;
        }
      },
      async addUserTag (tag) {
        this.snackbar = true;
        if (tag === 'Netflix & Chill')
          tag = 1;
        if (tag === 'Athletic')
          tag = 2;
        if (tag === 'Gastronomy')
          tag = 3;
        if (tag === 'Nature Lovers')
          tag = 4;
        if (tag === 'Nightlife')
          tag = 5;
        if (tag === 'Adventurer')
          tag = 6;
        try {
          const res = await axios.post("http://localhost:8001/addUserTag", {
            id_user: this.id,
            id_tag: tag,
          });
        } catch (error) {
          this.resText = 'Error, please retry1';
        }
        this.getTags();
      },
      async removeUserTag (tag) {
        this.snackbar = true;
        if (tag === 'Netflix & Chill')
          tag = 1;
        if (tag === 'Athletic')
          tag = 2;
        if (tag === 'Gastronomy')
          tag = 3;
        if (tag === 'Nature Lovers')
          tag = 4;
        if (tag === 'Nightlife')
          tag = 5;
        if (tag === 'Adventurer')
          tag = 6;
          // console.log('COUCOU');
        try {
          const res = await axios.get("http://localhost:8001/removeUserTag/" + this.id +"/" + tag, {
          });
          // console.log(res);
        } catch (error) {
          this.resText = 'Error, please retry2';
        }
        this.getTags();
      }
    },
}
</script>