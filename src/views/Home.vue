<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="6" class="text-center text-md-right">
        <v-btn color="info" large :to="{ name: 'Meetups'}">Explore Meetups</v-btn>
      </v-col>
      <v-col sm="12" md="6" class="text-md-left text-center">
        <v-btn color="info" large :to="{ name: 'CreateMeetup'}">Add Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="9">
        <v-carousel >
          <v-carousel-item v-for="m in meetups" :key="m.id" :src="m.imgUrl" @click="onLoadMeetup(m.id)" style="cursor: pointer" :to="`/meetups/${m.id}`">
            <v-row class="fill-height pb-4" justify="center" align="end">
              <v-sheet color="rgba(0, 0, 0, 0.4)" class="title mb-9 px-4 py-2">{{ m.title }}</v-sheet>
            </v-row>
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
      this.$router.push('/meetup/' + id)
    }
  }
}

</script>
