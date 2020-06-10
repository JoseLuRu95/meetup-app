<template>
  <div>
    <v-navigation-drawer app v-if="window.width < 960 " v-model="showDrawer" mobile-break-point="960">
      <v-list elevation="1">
        <v-list-item link v-for="v in views" :key="v.name" :to="{ name: v.name }" pointer>
          <v-list-item-icon>
            <v-icon color="primary">{{ v.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ v.name }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-app-bar-nav-icon class="primary--text ml-1 d-md-none" @click.stop="showDrawer = !showDrawer"/>
      <v-toolbar-title><v-btn text :to="{ name: 'Home'}">Meeting App</v-btn> </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="v in views" :key="v.name" class="mx-1 d-none d-md-flex" color="secondary" text small :to="{ name: v.name }">
        <v-icon class="mr-2">{{ v.meta.icon }}</v-icon>
        {{ v.name }}
      </v-btn>
      <v-btn v-if="userIsAuthenticated" class="mx-1 d-none d-md-flex" color="secondary" text small :to="{ name: 'Sign In' }" @click="onLogout">
        <v-icon class="mr-2">fas fa-sign-out-alt</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  components: {
  },
  data () {
    return {
      window: {
        width: 0
      },
      btnDisabled: false,
      showDrawer: false
    }
  },
  computed: {
    // Define which views print when there is a user sign up or not
    views () {
      let menuItems = [...this.$router.options.routes].filter(r => r.meta && r.meta.showOnDrawer === true)
      if (this.userIsAuthenticated) {
        return menuItems.slice(0, 3)
      } else {
        return menuItems.slice(3, 5)
      }
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
    },
    onLogout (command) {
      this.$store.dispatch('logout')
    }
  }
}
</script>
