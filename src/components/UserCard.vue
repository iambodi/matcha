<template>
  <v-card @click.stop="dialog=true" class="d-inline-block mx-auto">
          <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <ProfileCard :user="user" v-on:deleteUser="deleteUser"/>
    </v-dialog>

    <v-container>
       <div class="overline mb-0">{{user.username}}</div>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="150"
            width="150"
            :src="user.photo"
          >
       <div v-if="user.online===1" class="overline mb-0"><v-icon color="green">mdi-access-point</v-icon></div>
        </v-img>
        </v-col>

        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
                <v-icon>mdi-cake-variant</v-icon>
                {{user.age}}
            </v-col>

            <v-col class="px-0">
                <v-icon>mdi-car-side</v-icon> {{user.dist.toFixed(0)}} km
            </v-col>

            <v-col class="px-0">
                <v-icon>mdi-star-outline</v-icon>  {{user.popularity.toFixed(0)}}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ProfileCard from "./ProfileCard"
    export default {
      components :{
        ProfileCard,
      },
        props: {
            user: Object,
        },
        data() {
            return {
              dialog: false,

            }
        },
        mounted (){
          
        },
        methods: {
          deleteUser(user) {
            this.dialog = false;
            this.$emit("deleteUser", user)
          }
        },
    }
</script>