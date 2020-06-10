<template>
  <v-container>
    <v-row justify="center">
      <v-progress-circular v-if="loading" :size="70" :width="7" color="primary" class="mt-10" indeterminate></v-progress-circular>
      <v-col v-else cols="12" md="8">
        <v-card>
          <v-card-title>
            <h1 class="title primary--text">{{ meetup.title }}</h1>
            <v-spacer></v-spacer>
            <v-btn v-if="userIsCreator" icon @click="dialog = true"><v-icon>fas fa-pencil-alt</v-icon> </v-btn>
          </v-card-title>
          <v-img :src="meetup.imgUrl" height="400px"></v-img>
          <v-card-text>
            <h2 class="subtitle-1 primary--text">{{ meetup.day }} / {{ meetup.time }} : {{meetup.location}}</h2>
            <span>{{ meetup.description}}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="true">
              <v-btn v-if="!userIsRegistered" class="primary" @click="dialog2 = true">
                Register
              </v-btn>
              <v-btn v-else class="primary" @click="unregister">
                Unregister
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <editMeetup :dialog="dialog" :meetup="meetup" @updateMeetup="updateMeetup"  @closeDialog="closeDialog"/>
    <register :dialog="dialog2" @registerToMeetup="registerToMeetup" @closeDialog="closeDialog"/>
  </v-container>
</template>

<script>
import editMeetup from './editMeetup'
import register from './register'

export default {
  props: {
    id: {
      type: String,
      required: true,
      default: () => { return '' }
    }
  },
  components: {
    editMeetup,
    register
  },
  data () {
    return {
      dialog: false,
      dialog2: false
    }
  },
  computed: {
    meetup () {
      return this.$store.getters.fetchedMeetup
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsCreator () {
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    userIsRegistered () {
      return this.meetup.users.some(m => { return m.id === this.$store.getters.user.id })
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.dialog2 = false
    },
    unregister () {
      const idRegister = this.meetup.users.find(m => m.id === this.$store.getters.user.id).idRegister
      this.$store.dispatch('unregisterUser', [this.id, idRegister])
        .then(() => {
          this.$store.dispatch('fetchMeetupById', this.id)
        })
        .catch((err) => { throw err })
    },
    updateMeetup (payload) {
      this.$store.dispatch('updateMeetup', { ...payload, 'id': this.id })
        .then(() => {
          this.closeDialog()
          this.$store.dispatch('fetchMeetupById', this.id)
        })
        .catch((err) => { throw err })
    },
    registerToMeetup () {
      this.$store.dispatch('registerUser', this.id)
        .then(() => {
          this.closeDialog()
          this.$store.dispatch('fetchMeetupById', this.id)
        })
        .catch((err) => { throw err })
    }
  },
  created () {
    if (this.id) {
      this.$store.dispatch('fetchMeetupById', this.id)
    }
  }
}
</script>
