<template>
<v-card>
      <v-col cols="12">
        <v-subheader class="pl-0">Number of users to add</v-subheader>
        <v-slider
        min=1
        max=500
          v-model="userNumber"
          thumb-label="always"
        ></v-slider>
        <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="gender"
          label="Select gender"
          outlined
          v-model="selectedGender"
        ></v-select>
      </v-col>
      </v-col>
      </v-card>
</template>

<script>

export default {
    data () {
        return {
            userNumber: 250,
            gender:['Male', 'Female', 'Both'],
            selectedGender: "Both",
            firstNames: [],
        }
    },
    methods: {

    }
}
</script>