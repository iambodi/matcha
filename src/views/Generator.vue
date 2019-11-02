<template>
  <v-btn @click.stop="submit">Populate databasee with 500 random users
    </v-btn>
</template>

<script>

export default {
    data () {
        return {
        }
    },
    methods: {
      async submit() {
      try {
        const res = await axios.get("http://localhost:8001/randomUser", {}); // ajout de 500 users
        console.log(res);
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry");
      }
      }
    }
}
</script>