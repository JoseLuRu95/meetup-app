<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
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
