<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title class="deep-orange lighten-1" primary-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="user.firstname" label="First name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.lastname"
                  label="Last name*"
                  hint="helper text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user.email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="user.pwd"
                  label="Password*"
                  type="password"
                  hint="At least 8 letters + digits"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="user.confirmpwd"
                  label="Confirm password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Birthdate" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete v-model="user.gender" label="Gender" :items="gender"></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="submit">Login</v-btn>
          <v-btn color="blue darken-1" text @click="show = false">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  
<script>
export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        pwd: "",
        confirmpwd: "",
        birthdate: this.date,
        gender: ""
      },
      gender: ["Male", "Female", "Non-binary"],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post("http://localhost:8001/register", {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.pwd,
          confirmpwd: this.user.confirmpwd,
          birthdate: this.user.birthdate,
          gender: this.user.gender
        });
        console.log(response);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    }
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
  }
};
</script>