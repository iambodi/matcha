<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" v-if="getParams()">
        <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
            <div class="text-center"><span>{{resText}}</span></div>
        </v-snackbar>
        <v-card-text>
      <div class="title text--primary">Change your password</div>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="New password"
            hint="At least 8 letters and digit"
            counter
            @click:append="show = !show"
          ></v-text-field>
          <v-text-field
            v-model="confirmpwd"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  
</template>

<script>
export default {
    data () {
      return {
        test: "",
        formHasErrors: "", 
        errorMessages: "",
        show: false,
        show1: false,
        snackbar: false,
        resText: "",
        email: "",
        key: "",
        password: "",
        confirmpwd: "",
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'At least 8 letters and digits',
          pwdMatch: () => ('The password and confirm password you entered don\'t match'),
        },
      }
    },
    methods: {
     getParams () {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search.slice(1));
            const email = params.get('email');
            const key = params.get('key');
            console.log(window.location.href);
            if (params.has('email') === true && params.has('key')) {
                this.email = email;
                this.key = key;
                 return true;
            } else
                window.location = 'http://localhost:8080';
            return false;
        },
        async submit() {
            try {
            this.snackbar = true;
            const res = await axios.post("http://localhost:8001/checkKey/" + this.email);
                    // console.log(res.data);
            // console.log(res.data.key);
                // console.log(this.key);
            if (res.data.key === this.key) {
                try {                    
                    const ret = await axios.post("http://localhost:8001/saveNewPassword", {
                        email: this.email,
                        password: this.password,
                        confirmPwd: this.confirmpwd,
                    });
                    console.log(res.data);
                    this.resText = 'Successfuly changed your password';
                    } catch (error) {
                    this.resText = 'Failed to change your password, please retry the processus'
                }
            } else
            this.resText = 'Wrong link or token';
            } catch (error) {
            this.resText = 'Nothing here';
            }
        }
    }
}
</script>