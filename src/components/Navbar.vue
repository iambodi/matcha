<template>
    <nav v-if="logged">
         <!-- src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" -->
        <v-app-bar flat app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase deep-orange--text">
                <span :style="{ cursor: 'pointer'}" @click="redirect" class="cursos-pointer font-weight-light">MAT</span>
                <span :style="{ cursor: 'pointer'}" @click="redirect">Cha</span>
            </v-toolbar-title>
                <v-btn icon @click.stop="notif=true">
                    <v-icon>mdi-bell-outline</v-icon>
                    <Notif v-model="notif" /></v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app class="deep-orange lighten-1">
            <v-layout class="pb-5" align-center justify-space-between column fill-height>
        <v-list>
            <v-list-item-title class="headline font-italic">Dashboard
            <v-divider></v-divider>

            </v-list-item-title>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-icon>
                    <v-icon class="white--text">{{link.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
            </v-list-item>
            <v-spacer></v-spacer>
        </v-list>
        <v-btn color="white">
                <span class="red--text">Sign out</span>
                <v-icon class="red--text" right>mdi-exit-to-app</v-icon>
            </v-btn>
            </v-layout>
        </v-navigation-drawer>
    </nav>    
</template>

<script>
import Notif from '../components/Notif'

export default {
    data() {
        return {
            notif: false,
            drawer: false,
            logged: true,
            links: [
                { icon: 'mdi-account-circle-outline', text: 'About you', route: '/about' },
                { icon: 'mdi-account-heart-outline', text: 'Looking for', route: '/lookingfor' },
                { icon: 'mdi-information-outline', text: 'Personal informations', route: '/info' },
            ],
        }
    },
    components: {
        Notif,
    },
    methods: {
        redirect () {
            window.location = 'http://localhost:8080';
        }
    }
}
</script>