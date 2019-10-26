<template>
<v-col cols="12" sm="10" md="8" lg="6">
    <v-card rev="form">
        <v-card-text>
            <v-text-field
                ref="city"
                v-model="email"
                label="Email"
                required
            >
            </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" text @click="submitMail">Submit</v-btn>
        </v-card-actions>
    </v-card>
</v-col>
</template>

<script>
    export default {
        data() {
            return {
                id: localStorage.getItem('id'),
                email: "",
            }
        },
        mounted(){
        
        },
        methods: {
      async submitMail() {
      try {
        //this.snackbar = true;
        const res = await axios.get("http://localhost:8001/setting/" + this.id, {
        });
        if (res.data.message === 'error') {
          this.$emit('alertMsg', "fail", "An error occured, please retry, if it persist please sign out and sign in");
        }
        else if (res.data.success === true) { 
          try {
            const res = await axios.post("http://localhost:8001/updateEmail/", {
              idUser : this.id,
              newEmail: this.email,
            });
            if (res.data.message === 'error') {
                this.$emit('alertMsg', "fail", "Failed to update email, please retry");
            }
            else if (res.data.message === 'emailTaken') {
                this.$emit('alertMsg', "fail", "This email is already used");
            }
            else if (res.data.message === 'success') {
                this.$emit('alertMsg', "fail", "Email modified");
            }
            else {
                this.$emit('alertMsg', "fail", "Please retry");
            }
          } catch (error) {
            this.$emit('alertMsg', "fail", "Please retry");
          }
        }
      } catch (error) {
            this.$emit('alertMsg', "fail", "Please retry");
      }
    },
        }
    }
</script>