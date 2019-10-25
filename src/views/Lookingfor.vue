<template>
<v-row>
  <v-col cols="12" sm="6" md="4" lg="4" xl="4" >
    <LookingForPrefs/>
  </v-col>
  <v-col>
    <LookingForTags/>
  </v-col>
</v-row>
</template>

<script>
import LookingForTags from '../components/LookingForTags'
import LookingForPrefs from '../components/LookingForPrefs'

  export default {
   components: {
      LookingForTags,
      LookingForPrefs,
    },
  }
</script>