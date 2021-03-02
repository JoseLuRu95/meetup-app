<template>
  <v-app>
    <Toolbar/>
      <v-main>
        <v-container>
          <v-fade-transition mode="out-in">
            <router-view/>
          </v-fade-transition>
        </v-container>
      </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/layout/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
  },

  data: () => ({
    //
  })
}
</script>
