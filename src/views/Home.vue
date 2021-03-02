<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12" md="10" lg="9">
        <v-carousel class="elevation-1"  show-arrows-on-hover :show-arrows="!!meetups.length" :hide-delimiters="!meetups.length && !loading">
          <v-carousel-item  v-for="m in meetups" :key="m.id" :src="m.imgUrl" @click="onLoadMeetup(m.id)" style="cursor: pointer">
            <v-row  class="fill-height pb-4" justify="center" align="end">
              <v-sheet color="rgba(0, 0, 0, 0.4)" class="title mb-9 px-4 py-2">{{ m.title }}</v-sheet>
            </v-row>
          </v-carousel-item>
          <v-carousel-item v-if="!meetups.length && !loading">
            <v-sheet
              color="secondary"
              tile
              style="height: 100%">
              <v-row
                class="fill-height"
                align="center"
                justify="center">
                <div>
                  <p class="display-3">
                    There are no meetups
                  </p>
                  <p class="display-1">
                    Create a new one!
                  </p>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-progress-linear v-if="loading" indeterminate color="primary darken-1"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
  },
  computed: {
    meetups () {
      return this.$store.getters.featureMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push(`/meetups/${id}`)
    }
  },
  mounted () {
    this.$store.dispatch('fetchMeetups')
  }
}

</script>
