<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title class="deep-orange lighten-1" primary-title>Reset Password</v-card-title>
      <v-card-text>
        <v-form>
          <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
            <div class="text-center"><span>{{resText}}</span></div>
          </v-snackbar>
          <v-text-field
            v-model="email"
            label="Email"
            name="Email"
            prepend-icon="mdi-gmail"
            type="email"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
    snackbar: false,
    resText : "",
    email: "",
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
   methods: {
    async submit() {
      try {
        this.snackbar = true;
        const res = await axios.post("http://localhost:8001/resetPassword", {
          email: this.email,
        });
        if (res.data.message === "regex") {
            this.resText = 'Please enter a valid email';
        }
        if (res.data.success === true) {
            this.resText = 'Check your mail to reset your password';          
        }
        else {
          console.log(res.data.message);
          this.resText = 'Please retry';
        }
      } catch (error) {
        this.resText = 'Error, please retry';
      }
    }
  }
}
</script>