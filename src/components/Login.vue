<template>
    <v-card>
      <v-card-title class="deep-orange lighten-1" primary-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
            <div class="text-center"><span>{{resText}}</span></div>
          </v-snackbar>
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
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="flex-grow-1"></div>
         <v-btn rounded color="error" width="20vw" @click.stop="ResPwd=true; show=false">Reset password
         <ResPwd v-model="ResPwd"/></v-btn>
        <v-btn color="primary" text @click="submit">Submit</v-btn>
      </v-card-actions>
      <v-card-actions class="text-center">
            <v-btn rounded color="error" width="20vw" @click.stop="register=true">Register
              <Register align-center v-model="register" />
            </v-btn>
      </v-card-actions>
      </v-card>
</template>


<script>
import ResPwd from './ResPwd'
import Register from './Register'

export default {
  data() {
    return {
      // logged: localStorage.getItem('logged'),
      register: false,
      id: localStorage.getItem('id'),
      ResPwd: false,
      snackbar: false,
      resText : "",
      login: {
        email: "",
        pwd: "",
      }
    };
  },
  components: {
    ResPwd,
    Register
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
        const res = await axios.post("http://localhost:8001/login", {
          email: this.login.email,
          password: this.login.pwd
        });
        this.resText = res.data.message;
       // console.log(res.data);
        if (res.data.success === true){
          localStorage.setItem('logged', true);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('id', res.data.user_id);      
          this.$emit('loggingSuccess', res.data.user_id);
         // window.location = 'http://localhost:8080'
        }
      } catch (error) {
        this.$emit('alertMsg', "fail", "Error, please retry")
      }
    }
  }
};
</script>