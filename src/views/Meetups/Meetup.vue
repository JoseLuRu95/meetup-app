<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h1 class="title primary--text">{{ meetup.title }}</h1>
          </v-card-title>
          <v-img :src="meetup.imgUrl" height="400px"></v-img>
          <v-card-text>
            <h2 class="subtitle-1 primary--text">{{ meetup.date.day }} / {{ meetup.date.time }}</h2>
            <span>{{ meetup.description}}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // Se obtiene el atributo ID de la URL, una vez habilitada la opción en el archivo index.js de las rutas
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
