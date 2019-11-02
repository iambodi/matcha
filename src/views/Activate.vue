<template>
<v-container fill-height>
  <v-card v-if="getParams()"
    v-model="actived"
    class="mx-auto"
    max-width="800"
    max-height="150"
    outlined
  >
    <v-card-text>
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
        getParams () {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search.slice(1));
            const email = params.get('email');
            const key = params.get('key');
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
            if (res.data.key === this.key && res.data.confirm === 0) {
                try {                    
                    const ret = await axios.get("http://localhost:8001/activateAccount/" + this.email);
                    this.ID = id;
                    this.$emit('alertMsg', "success", "Account successfully activated! You can now login")
                } catch (error) {
                    this.$emit('alertMsg', "fail", "Failed to activate user account")
                }
            } else if (res.data.key === this.key && res.data.confirm === 1) {
                this.$emit('alertMsg', "fail", "You're already confirmed")
            } else
                this.$emit('alertMsg', "fail", "Wrong link")
            } catch (error) {
                this.$emit('alertMsg', "fail", "Nothing here")
            }
        }
    },
}
</script>