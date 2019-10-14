<template>
<v-dialog v-model="show" max-width="400px">
      <v-card>
        <v-card-title class="deep-orange lighten-1 white--text" primary-title>
          Notifications
        </v-card-title>
        <v-card-text>

        </v-card-text>
      </v-card>
</v-dialog>
</template>

<script>
export default {
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
}
</script>