<template>
  <v-container>
    <v-row justify="center" class="mt-6">
      <v-col cols="11" sm="7" md="6" lg="4" class="elevation-3">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy" class="ma-4" @submit.prevent="validate">
          <app-alert v-if="error" :text="error.message"/>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
            required
          ></v-text-field>
          <v-btn :disabled="loading" color="success" class="mr-4" :loading="loading" type="submit">
            Sign in
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      show: false,
      password: '',
      email: '',
      lazy: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
      }
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
  }
}
</script>
