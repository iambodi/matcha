<template>
   <v-col cols="12" md="6" lg="6" xl="6">
        <v-card
            elevation="15"
            max-width="444"
            class="deep-orange lighten-1"
        >
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
            <v-btn @click="delPhoto" text icon color="deep-orange lighten-1">
            <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
            </v-carousel-item>
            </v-carousel>
            <v-btn @click="onFilePick">Upload image</v-btn>
            <input 
                type="file" 
                id="image"
                ref="fileInput"
                style="display:none"
                accept="image/*"
                @change="uploadPhoto"
            />
        </v-card>
    </v-col>
</template>

<script>
    export default {
        data(){
            return {
                items: [],
                cycle: false,
                id: localStorage.getItem('id'),
            }
        },
        mounted() {
            this.getPhoto();
        },
        methods: {
            async getPhoto() {
                try {
                  const res = await axios.get("http://localhost:8001/getUserPhotos/" + this.id, {});
                  for (var i = 0; i < res.data.photos.length ; i++) {
                      const img = {src: res.data.photos[i].photo, id_photo: res.data.photos[i].id_photo};
                      this.items.push(img);
                  }
                } catch (error) {
                    this.resText = 'Error, please retry';
                }
            },
            onFilePick () {
                this.$refs.fileInput.click();
            },
            uploadPhoto(e) {
                const files = e.target.files
                const fileSize = files[0].size / 1024 / 1024; // in MB        
                let filename = files[0].name;
                if (this.items.length > 4){
                    return alert('You can\'t have more than 5 pictures');
                }
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file');
                }
                else if (fileSize > 2) {
                    alert('File size exceeds 2 MB');
                }
                else {
                    const fileReader = new FileReader();
                    fileReader.addEventListener('load', () => {
                        this.image = fileReader.result;
                        this.addPhoto(this.image);
                    })
                    fileReader.readAsDataURL(files[0]);
                    this.imageUrl = files[0];
                    console.log('SUCCESS');
                }        
            },
            async addPhoto(photo) {
                this.items.push({src: this.image})
                try {
                    const res = await axios.post("http://localhost:8001/uploadPhoto", {
                        id :this.id,
                        photo: photo,
                        active: 1,
                    });
                } catch (error) {
                    console.log('Error, please retry');
                }
            },
            async delPhoto(photo) {
                try {
                    const res = await axios.post("http://localhost:8001/deletePhoto", {
                        id :this.id,
                        id_photo: this.items[0].id_photo,
                    });
                    console.log(res);
                    console.log(this.items[0].id_photo);
                } catch (error) {
                    console.log('Error, please retry');
                }
            },
        },
    }
</script>