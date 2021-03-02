<template>
  <v-dialog persistent v-model="dialog" @click:outside="closeDialog" max-width="600px">
        <v-card max-width="600" elevation="4" class="mx-auto">
        <v-card-title>
          <h1 class="headline primary--text">Do you want to register for meetup?</h1>
        </v-card-title>
      <v-card-text>
        <p>You can change your mind later on</p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="warning" @click="closeDialog">Cancel</v-btn>
        <v-btn class="success" @click="register">Accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: () => { return false }
    }
  },
  data () {
    return {
      payload: {},
      valid: false,
      rules: [
        v => !!v || 'Required'
      ]
    }
  },
  methods: {
    register () {
      this.$emit('registerToMeetup')
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
