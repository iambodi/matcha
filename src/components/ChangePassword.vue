<template>
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
        <v-divider class="mt-3"></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
</template>

<script>
    export default {
        data() {
            return {
                currentpwd: "",
                password: "",
                confirmpwd: "",
                show1: false,
                show2: false,
                show3: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: value => value.length >= 8 || 'At least 8 letters and digits',
                },
            }
        },
        mounted(){

        },
        methods: {
            async submit() {
                try {
                    this.snackbar = true;
                    const res = await axios.get("http://localhost:8001/setting/" + this.id, {
                    });
                    if (res.data.message === 'error') {
                      this.$emit('alertMsg', "fail", "An error occured, please retry, if it persist please sign out and sign in")
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
                              this.$emit('alertMsg', "fail", "New password and confirm password don't match")
                            }
                            if (res.data.message === 'currentPwd') {
                              this.$emit('alertMsg', "fail", "Current password is incorrect")
                            }
                            if (res.data.message === 'error') {
                              this.$emit('alertMsg', "fail", "Failed to update password")
                            }
                            if (res.data.message === 'success') {
                              this.$emit('alertMsg', "success", "Password successfully updated")
                            }
                          //  console.log(res.data);
                        } catch (error) {
                          this.$emit('alertMsg', "fail", "Error, please retry")
                        }
                    }
                } catch (error) {
                  this.$emit('alertMsg', "fail", "Error, please retry")
                }
            },
        },
    }
</script>