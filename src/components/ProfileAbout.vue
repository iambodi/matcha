<template>
<v-col cols="12">
    <v-card
        elevation="15"
        class="mx-auto"
        max-width="600"
    >
        <v-card-title class="deep-orange lighten-1 white--text">About you</v-card-title>
            <ProfileAboutInfos v-on:alertMsg="fireAlert"/>
        <v-divider class="mx-4"></v-divider>
            <ProfileAboutTags v-on:alertMsg="fireAlert"/>
    </v-card>
</v-col>
</template>

<script>
import ProfileAboutInfos from './ProfileAboutInfos'
import ProfileAboutTags from './ProfileAboutTags'

    export default {
        components: {
            ProfileAboutInfos,
            ProfileAboutTags,
        },
        data(){
            return {
                resText: "",
                id: localStorage.getItem('id'),
            }
        },
        mounted() {
        },
        methods: {
            fireAlert(state, message) {
                this.$emit('alertMsg', state, message);
            },
        },
    }
</script>