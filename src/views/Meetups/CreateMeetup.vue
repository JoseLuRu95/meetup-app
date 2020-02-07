<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" md="10" lg="6">
        <h1 class="headline primary--text">Create a new Meetup</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" md="10" lg="6" class="elevation-4 px-12" >
        <v-form v-model="valid" ref="form" @submit.prevent="validate">
          <v-row>
            <v-col cols="12">
              <v-text-field name="title" label="Title" v-model="title" :rules="rules" required></v-text-field>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="12">
              <v-text-field name="location" label="Location" prepend-icon="fas fa-map-marker" v-model="location" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <!-- https://i0.wp.com/brainstomping.com/wp-content/uploads/2013/03/bioshock-infinite-columbia.jpg?ssl=1 -->
              <v-text-field name="imgUrl" label="Image Url" prepend-icon="fas fa-image" v-model="imgUrl" :rules="rules" required></v-text-field>
            </v-col>
            <v-col v-if="imgUrl !== ''">
              <v-img  :src="imgUrl"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea name="description" label="Descrition" v-model="description" :rules="rules" prepend-inner-icon="fas fa-pencil-alt" required></v-textarea>
            </v-col>
          </v-row>
          <v-row class="justify-space-around mb-6">
              <v-date-picker v-model="day" color="primary lighten-1" ></v-date-picker>
              <v-time-picker v-model="time" color="primary lighten-1"></v-time-picker>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
                Create
              </v-btn>
              <v-btn color="error" class="mr-4" @click="resetMeetup">
                Reset Form
              </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imgUrl: '',
      description: '',
      day: '',
      time: '',
      valid: false,
      rules: [
        v => !!v || 'Required',
        v => v.length >= 1 || 'Must be at least 10 characters'
      ]
    }
  },
  methods: {
  // Necessary for validation form
    validate () {
      if (this.$refs.form.validate()) {
        const meetupData = {
          title: this.title,
          location: this.location,
          imgUrl: this.imgUrl,
          description: this.description,
          date: {
            day: this.day,
            time: this.time
          }
        }
        this.$store.dispatch('createMeetup', meetupData)
      }
    },
    resetMeetup () {
      this.$refs.form.reset()
    }
  }
}
</script>
