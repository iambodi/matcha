<template>
  <v-app color="red">
    <v-content class="mx-10 mb-10">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.theme--light.v-application
{
    background: none;
}
</style>
