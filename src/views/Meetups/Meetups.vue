<template>
  <v-container>
    <v-row justify="center">
      <v-progress-circular v-if="loading" :size="70" :width="7" color="primary" class="mt-10" indeterminate></v-progress-circular>
      <v-col v-if="!loading" cols="12" md="8">
        <v-card flat color="rgb(25, 118, 210, 0.2)" v-for="m in meetups" :key="m.id" class="mt-4">
            <v-row class="px-4">
              <v-col cols="5" md="4">
                <v-img :src="m.imgUrl" height="150px"></v-img>
              </v-col>
              <v-col cols="7" md="8">
                <v-container class="d-flex flex-column">
                  <div class="title">{{ m.title }}</div>
                  <div class="subtitle-1">{{ m.day }} / {{m.time }}</div>
                </v-container>
                <v-card-actions>
                  <v-btn text :to="`/meetups/${m.id}`"><v-icon class="mr-4">fas fa-arrow-right</v-icon> View Meetup</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
        </v-card>
        <v-card v-if="!meetups.length && !loading" flat color="rgb(25, 118, 210, 0.2)" class="mt-4">
            <v-row class="px-4"
                style="height: 300px"
                align="center"
                justify="center">
                <div>
                  <p class="display-2">
                    There are no meetups
                  </p>
                  <p class="display-1">
                    Create a new one!
                  </p>
                </div>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  mounted () {
    this.$store.dispatch('fetchMeetups')
  }
}
</script>
