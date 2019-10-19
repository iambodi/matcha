<template>
<v-container fill-height>
  <v-card v-if="getPath()"
    v-model="actived"
    class="mx-auto"
    max-width="800"
    max-height="150"
    outlined
  >
    <v-card-text text-center>
        {{ activationText }}
        <v-btn @click="submit">Verify your account</v-btn>
    </v-card-text>
  </v-card>
</v-container>

</template>


<script>
export default {
    data () {
        return {
            actived : false,
            activationText : "",
            params: "",
            email: "",
            key: "",
            ID: "",
        }
    },
    watch: {
        input: function () {
            if (isLocalStorage() /* function to detect if localstorage is supported*/) {
            localStorage.setItem(this.ID, this.key)
            }
        }
    },
    methods : {
        getPath () {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search.slice(1));
            const email = params.get('email');
            const key = params.get('key');
             console.log(window.location.href);
            if (params.has('email') === true && params.has('key')) {
                this.actived = true;
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
            const res = await axios.get("http://localhost:8001/activate/" + this.email);
            const id = res.data.userId;
            if (res.data.key === this.key) {
                try {                    
                    const ret = await axios.get("http://localhost:8001/activateAccount/" + this.email);
                    this.ID = id;
                    localStorage.setItem('id', id);
                    localStorage.getItem('id');
                    // console.log(res.data);
                    if (res.data.confirm = 1){
                    this.activationText = "You're already confirmed";
                    } else
                    // app.input = localStorage.getItem(this.ID);
                    this.activationText = 'Account successfully activated! You can now login'
                    // console.log(this.ID);
                } catch (error) {
                    this.activationText = 'Failed to activate user account'
                }
            } else
            this.activationText = 'Wrong link';
            } catch (error) {
            this.activationText = 'Nothing here';
            }
        }
    },
}
</script>