<template>
  <v-container fluid fill-height justify-center align-center>
    hello
  </v-container>
</template>



<script>

export default {
  data () {
    return {
      id: localStorage.getItem('id'),
    }
  },
  mounted() {
    this.enterViewHome()
  },
  components: {
  },
  methods: {
    enterViewHome() {
      // axios.get
      console.log("hey")
    },
  },
  computed: {
  }
};
</script>
