<template>
  <v-col cols="12" sm="10" md="8" lg="6">
    <v-card ref="form">
      <v-card-text>
        <div class="title text--primary">Change your personal informations</div>
        <v-text-field ref="name" v-model="firstname" label="First name" required></v-text-field>
        <v-text-field ref="address" v-model="lastname" label="Last name" required></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="submitName">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      id: localStorage.getItem("id"), // get l'id via les props apres
      firstname: "",
      lastname: ""
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    async getName() {
      try {
        this.snackbar = true;
        const res = await axios.get(
          "http://localhost:8001/setting/" + this.id,{});
        if (res.data.message === "error") {
          this.$emit("alertMsg", "fail", "An error occured, please retry, if it persist please sign out and sign in");
        }
        else {
            this.firstname = res.data.user[0].firstname;
            this.lastname = res.data.user[0].lastname;
        }
      } catch (error) {
        this.$emit("alertMsg", "fail", "Error, please retry");
      }
    },
    async submitName() {
        try {
            const res = await axios.post("http://localhost:8001/updateName/", {
              idUser: this.id,
              newFirstName: this.firstname,
              newLastName: this.lastname
            });
            if (res.data.message === "firstname" || res.data.message === "lastname") {      
              this.$emit("alertMsg", "fail", " Firstname and lastname must contain between 2 and 20 characters. [-] and [ ] are accepted");
            }
            if (res.data.message === "success") {
              this.$emit("alertMsg", "success", "User name modified");
            }
            if (res.data.message === "error") {
              this.$emit("alertMsg", "fail", "Failed to update user's name");
            }
        } catch (error) {
            this.$emit("alertMsg", "fail", "Error, please retry");
        }
    }
  }
};
</script>