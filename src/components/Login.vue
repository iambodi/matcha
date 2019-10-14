<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title class="deep-orange lighten-1" primary-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="login.email"
            label="Email"
            name="Email"
            prepend-icon="mdi-gmail"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="login.pwd"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock-outline"
            type="password"
          ></v-text-field>
          <p>Data : {{ login.email}}</p>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="submit" v-on:click="dialog = false">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data() {
    return {
      login: {
        email: "",
        pwd: "",
      }
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
        const response = await axios.post("http://localhost:8001/login", {
          email: this.login.email,
          password: this.login.pwd
        });
        console.log(response);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>