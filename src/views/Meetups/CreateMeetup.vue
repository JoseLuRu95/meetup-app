<template>
  <v-card max-width="1200" elevation="4" class="mx-auto">
    <v-card-title>
      <h1 class="headline primary--text">Create a new Meetup</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <app-alert v-if="error" :text="error.message"/>
        <v-row>
          <v-col cols="12" md="7">
              <v-text-field label="Title" prepend-icon="fas fa-file-alt" v-model="payload.title" :rules="rules" outlined></v-text-field>
              <v-text-field label="Location" prepend-icon="fas fa-map-marker" v-model="payload.location" :rules="rules" outlined></v-text-field>
              <v-row dense class="pa-0">
                <v-col cols="6">
                  <v-menu v-model="menu1" transition="scale-transition" offset-y  max-width="290px"  min-width="290px" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="payload.day" outlined readonly prepend-icon="fas fa-calendar-alt" v-on="on" label="Fecha" :rules="rules"></v-text-field>
                    </template>
                    <v-date-picker v-model="payload.day">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu v-model="menu2" transition="scale-transition" offset-y  max-width="290px"  min-width="290px" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="payload.time" outlined readonly prepend-icon="fas fa-clock" v-on="on" label="Hora" :rules="rules"></v-text-field>
                    </template>
                    <v-time-picker v-model="payload.time" >
                    </v-time-picker>
                  </v-menu>
                </v-col>
            </v-row>
            <v-textarea area rows="2" label="Descrition" v-model="payload.description" :rules="rules" outlined></v-textarea>
          </v-col>
          <v-col cols="12" md="5">
            <input class="d-none" ref="fileInput" type="file" @change="loadFile">
            <v-card class="mx-auto" max-width="400">
              <v-card-text class="d-flex justify-center">
                <v-img class="my-2" v-if="image" contain :src="image"></v-img>
                <v-icon size="200" v-else>fas fa-camera</v-icon>
              </v-card-text>
              <v-card-actions>
                <v-btn small @click="onPickFile" color="info">Load Image</v-btn>
                <v-btn small @click="image = null" color="warning">Delete Image</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!(valid && image)" :loading="loading" color="success" class="mr-4" @click="validate">
        Create
      </v-btn>
      <v-btn color="error" class="mr-4" @click="resetMeetup">
        Reset Form
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      menu1: null,
      menu2: null,
      image: null,
      payload: {},
      valid: false,
      rules: [
        v => !!v || 'Required'
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
  // Necessary for validation form
    validate () {
      if (this.valid) {
        this.$store.dispatch('createMeetup', this.payload)
      }
    },
    resetMeetup () {
      this.$refs.form.reset()
      this.image = null
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    loadFile (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('') <= 0) {
        return alert('Please add a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.image = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.payload.imgUrl = files[0]
    }
  }
}
</script>
