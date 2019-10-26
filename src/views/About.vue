// l'ajout de photos ne marche que si on attend entre 2 clic de bouton

<template>
  <div class="about">
    <v-row justify="start">
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-snackbar v-bind:timeout="5000" top v-model="snackbar">
          <div class="text-center">
            <span>{{resText}}</span>
          </div>
        </v-snackbar>
        <v-card elevation="15" max-width="444" class="deep-orange lighten-1">
          <v-carousel
            v-if="items === undefined"
            :continuous="false"
            :cycle="cycle"
            :show-arrows="true"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="300"
          >
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
              //ICI
              <v-btn @click="delPhoto(i)" text icon color="deep-orange lighten-1">
                //
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-carousel-item>
          </v-carousel>
          <!-- <img :src="image" height="200"> -->
          <v-btn @click="onFilePick">Upload image</v-btn>
          <input
            type="file"
            id="image"
            ref="fileInput"
            style="display:none"
            accept="image/*"
            @change="uploadPhoto"
          />
          <!-- <v-list two-line> -->
          <!-- <v-file-input
    accept="image/png, image/jpeg, image/jpg"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
    @change="uploadPhoto"
          ></v-file-input>-->
          <!-- </v-list> -->
        </v-card>
      </v-col>

      <v-row>
        <v-col cols="12">
          <v-card elevation="15" class="mx-auto" max-width="600">
            <v-card-title class="deep-orange lighten-1 white--text">About you</v-card-title>
            <v-card-text>
              <v-col cols="12" sm="6">
                <v-select
                v-model="setGender"
                label="Gender"
                :items="gender"
                ></v-select>
              </v-col>
              <div class="my-4 subtitle-1 black--text">Write something about yourself:</div>
              //ICI fixer limite a 255 caracteres
              <v-textarea v-model="bio" counter label="Bio" :value="bio"></v-textarea>
              <v-btn @click="updatePrefs">Update</v-btn>
            //
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div class="title text--primary">Tags</div>
              <v-chip-group active-class="deep-orange lighten-1 white--text" column multiple>
                <v-chip v-model="tag1" @click="check('Netflix & Chill')">Netflix & Chill</v-chip>
                <v-chip v-model="tag2" @click="check('Athletic')">Athletic</v-chip>
                <v-chip active v-model="tag3" @click="check('Gastronomy')">Gastronomy</v-chip>
                <v-chip v-model="tag4" @click="check('Nature Lovers')">Nature Lovers</v-chip>
                <v-chip v-model="tag5" @click="check('Nightlife')">Nightlife</v-chip>
                <v-chip v-model="tag6" @click="check('Adventurer')">Adventurer</v-chip>
              </v-chip-group>
              <p>Data : {{ selected}}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
      id: localStorage.getItem("id"),
      tags: [
        "Netflix & chill",
        "Athletic",
        "Gastronomy",
        "Nature lovers",
        "Nightlife",
        "Aventurer"
      ],
      selected: Array(),
      // rules: [v => v.length <= 255 || 'Max 255 characters'],
      bio: "Hello!",
      setGender: "",
      gender: ["Male", "Female"],
      cycle: false,
      snackbar: false,
      userGender: "",
      resText: "",
      items: [],
      image: null,
      imageUrl: "",
      // ICI
      interests: "",
      distance: "",
      agerange: [],
      pop: "",
      //
    };
  },

  mounted() {
    this.getTags();
    this.getUser();
    this.getPhoto();
    // ICI
    this.getPrefs();
    //
    // (this.selected)
  },
  methods: {
    async getPhoto() {
      try {
        const res = await axios.get(
          "http://localhost:8001/getUserPhotos/" + this.id,
          {}
        );
        // console.log(res);
        for (var i = 0; i < res.data.photos.length; i++) {
          const img = {
            src: res.data.photos[i].photo,
            id_photo: res.data.photos[i].id_photo
          };
          // console.log(img);
          this.items.push(img);
        }
      } catch (error) {
        this.resText = "Error, please retry";
      }
    },
    async getUser() {
      try {
        const res = await axios.get(
          "http://localhost:8001/setting/" + this.id,
          {}
        );
        this.userGender = res.data.user[0].gender;
        this.bio = res.data.user[0].bio;
      } catch (error) {
        this.resText = "Error, please retry";
      }
    },
    getTags: async function() {
      try {
        const res = await axios.get(
          "http://localhost:8001/getUserTags/" + this.id,
          {}
        );
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
          if (res.data.userTags[i].tag === "Netflix & Chill") this.tag1 = true;
          if (res.data.userTags[i].tag === "Athletic") this.tag2 = true;
          if (res.data.userTags[i].tag === "Gastronomy") this.tag3 = true;
          if (res.data.userTags[i].tag === "Nature Lovers") this.tag4 = true;
          if (res.data.userTags[i].tag === "Nightlife") this.tag5 = true;
          if (res.data.userTags[i].tag === "Adventurer") this.tag6 = true;
        }
      } catch (error) {
        this.resText = "Error, please retry0";
      }
    },

    onFilePick() {
      this.$refs.fileInput.click();
    },
    uploadPhoto(e) {
      const files = e.target.files;
      const fileSize = files[0].size / 1024 / 1024; // in MB
      let filename = files[0].name;
      if (this.items.length > 4) {
        return alert("You can't have more than 5 pictures");
      }
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      } else if (fileSize > 2) {
        alert("File size exceeds 2 MB");
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.image = fileReader.result;
          // this.image = this.b64toBlob(this.image);
          this.addPhoto(this.image);
        });
        fileReader.readAsDataURL(files[0]);
        this.imageUrl = files[0];
        console.log("SUCCESS");
      }
    },
    //         b64toBlob(test) {
    //     var byteString = atob(test.split(',')[1]);
    //     var ab = new ArrayBuffer(byteString.length);
    //     var ia = new Uint8Array(ab);

    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: 'image/jpeg' });
    // },
    async addPhoto(photo) {
      this.items.push({ src: this.image });
      try {
        const res = await axios.post("http://localhost:8001/uploadPhoto", {
          id: this.id,
          photo: photo,
          active: 1
        });
      } catch (error) {
        console.log("Error, please retry");
      }
    },
    //
    async delPhoto(i) {
      // console.log(photo);
      try {
        const res = await axios.post("http://localhost:8001/deletePhoto", {
          id_user: this.id,
          id_photo: this.items[i].id_photo
        });
        this.items.splice(i, 1);
        // console.log(res);
      } catch (error) {
        console.log("Error, please retry");
      }
    },
    //
    check(tag) {
      if (this.selected.includes(tag)) {
        // console.log("contains " + tag);
        var index = this.selected.indexOf(tag);
        this.selected.splice(index, 1);
        this.removeUserTag(tag);
        // console.log(this.selected);
        //          return false;
      } else {
        // console.log("does not contains " + tag);
        this.selected.push(tag);
        this.addUserTag(tag);
        console.log(this.selected);
        //        return true;
      }
    },
    async addUserTag(tag) {
      this.snackbar = true;
      if (tag === "Netflix & Chill") tag = 1;
      if (tag === "Athletic") tag = 2;
      if (tag === "Gastronomy") tag = 3;
      if (tag === "Nature Lovers") tag = 4;
      if (tag === "Nightlife") tag = 5;
      if (tag === "Adventurer") tag = 6;
      try {
        const res = await axios.post("http://localhost:8001/addUserTag", {
          id_user: this.id,
          id_tag: tag
        });
      } catch (error) {
        this.resText = "Error, please retry1";
      }
      this.getTags();
    },
    async removeUserTag(tag) {
      this.snackbar = true;
      if (tag === "Netflix & Chill") tag = 1;
      if (tag === "Athletic") tag = 2;
      if (tag === "Gastronomy") tag = 3;
      if (tag === "Nature Lovers") tag = 4;
      if (tag === "Nightlife") tag = 5;
      if (tag === "Adventurer") tag = 6;
      // console.log('COUCOU');
      try {
        const res = await axios.get(
          "http://localhost:8001/removeUserTag/" + this.id + "/" + tag,
          {}
        );
        // console.log(res);
      } catch (error) {
        this.resText = "Error, please retry2";
      }
      this.getTags();
    },
    // ICI
    async getPrefs() {
      try {
        const res = await axios.get("http://localhost:8001/setting/" + this.id, {});
        console.log(res);
        if (res.data && res.data.user && res.data.user.length != 0) {
          let user = res.data.user[0];
          this.bio = user.bio;
          this.setGender = user.gender;
          this.interests = user.interest;
          this.distance = user.distance;
          this.agerange = [user.minage, user.maxage]
          this.pop = user.pop; // voir si c'est vraiment pop ou popularity
        }
      } catch (error) {
        this.resText = "Error, please retry";
      }
    },
    async updatePrefs() {
      try {
        const res = await axios.post("http://localhost:8001/updatePreferences", {
          bio: this.bio,
          gender: this.setGender,
          interest: this.interests,
          distance: this.distance,
          minage: this.agerange[0],
          maxage: this.agerange[1],
          pop: this.pop,
          id: this.id
        });
        this.resText = 'Successfuly updated your informations';
      } catch (error) {
        this.resText = "Error, please retry";
      }
    },
  }
};
</script>