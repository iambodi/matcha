<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
       <v-snackbar v-bind:timeout="5000" top v-model="snackbar"> 
            <div class="text-center"><span>{{text}}</span></div>
          </v-snackbar>
      <v-card ref="form">
        <v-card-text>
      <div class="title text--primary">Change your personal informations</div>

          <v-text-field
            ref="name"
            v-model="firstname"
            :error-messages="errorMessages"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="lastname"
            label="Last name"
            required
          ></v-text-field>
        </v-card-text>

<v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="submitName">Submit</v-btn>
        </v-card-actions>



<v-card-text>
          <v-text-field
            ref="city"
            v-model="email"
            label="Email"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="submitMail">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">

        <v-card-text>
      <div class="title text--primary">Change your password</div>

          <v-text-field
            v-model="currentpwd"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Current password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="New password"
            hint="At least 8 letters and digits"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-text-field
            v-model="confirmpwd"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            counter
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
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
        text: "",
        formHasErrors: "", 
        errorMessages: "",
        show1: false,
        show2: false,
        show3: false,
        snackbar: false,
        id: localStorage.getItem('id'),
        firstname: "",
        lastname: "",
        email: "",
        currentpwd: "",
        password: "",
        confirmpwd: "",
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'At least 8 letters and digits',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      }
    },
    methods: {
     async submit() {
      try {
        this.snackbar = true;
        const res = await axios.get("http://localhost:8001/setting/" + this.id, {
        });
        if (res.data.message === 'error') {
          this.resText = 'An error occured, please retry, if it persist please sign out and sign in';
        }
        else if (res.data.success === true) { 
          try {
            const res = await axios.post("http://localhost:8001/updatePassword/", {
              idUser : this.id,
              currentPassword : this.currentpwd,
              newPassword: this.password,
              newPasswordConfirmation: this.confirmpwd,
            });
            if (res.data.message === 'confirmPwd') {
              this.text = 'New password and confirm password don\'t match';
            }
            if (res.data.message === 'currentPwd') {
              this.text = 'Current password is incorrect';
            }
            if (res.data.message === 'error') {
              this.text = 'Failed to update password';
            }
            if (res.data.message === 'success') {
              this.text = 'Password successfully updated';
            }
            console.log(res.data);
          } catch (error) {
            this.text = 'Error, please retry';
          }
        }
      } catch (error) {
        this.text = 'Error, please retry';
      }
    },
    async submitName() {
      try {
        this.snackbar = true;
        const res = await axios.get("http://localhost:8001/setting/" + this.id, {
        });
        if (res.data.message === 'error') {
          this.text = 'An error occured, please retry, if it persist please sign out and sign in';
        }
        else if (res.data.success === true) {
          try {
            const res = await axios.post("http://localhost:8001/updateName/", {
              idUser : this.id,
              newFirstName : this.firstname,
              newLastName: this.lastname,
            });
            if (res.data.message === 'success') {
              this.text = 'Users name modified';
            }
            if (res.data.message === 'error') {
              this.text = 'Failed to update user\'s name';
            }
            console.log(res.data);
          } catch (error) {
            this.text = 'Error, please retry';
          }
        }
      } catch (error) {
        this.text = 'Error, please retry';
      }
    },
      async submitMail() {
      try {
        this.snackbar = true;
        const res = await axios.get("http://localhost:8001/setting/" + this.id, {
        });
        if (res.data.message === 'error') {
          this.resText = 'An error occured, please retry, if it persist please sign out and sign in';
        }
        else if (res.data.success === true) { 
          try {
            const res = await axios.post("http://localhost:8001/updateEmail/", {
              idUser : this.id,
              newEmail: this.email,
            });
            if (res.data.message === 'error') {
              this.text = 'Failed to update email, please retry';
            }
            else if (res.data.message === 'emailTaken') {
              this.text = 'This email is already used';
            }
            else if (res.data.message === 'success') {
              this.text = 'Email modified';
            }
            else {
            console.log(res.data);
              this.text = 'Please retry';
            }
          } catch (error) {
            this.text = 'Error, please retry';
          }
        }
      } catch (error) {
        this.text = 'Error, please retry';
      }
    },
  }
}
</script>