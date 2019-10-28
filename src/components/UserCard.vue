<template>
  <v-card class="d-inline-block mx-auto">
      
    <v-container>
       <div class="overline mb-0">{{user.firstname}} {{user.lastname}}</div>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="150"
            width="150"
            :src="user.photo"
          >
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
    export default {
        props: {
            user: Object,
        },
        data() {
            return {

            }
        },
        mounted (){
        //    console.log(this.user);
        },
        methods: {

        },
    }
</script>