<template>
  <v-container>
    <v-row justify="center" class="mt-6" dense>
      <v-col cols="11" sm="7" md="6" lg="4">
        <v-card>
          <v-card-title class="info">
            Glad to see you again
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy" class="ma-4" @submit.prevent="validate">
              <app-alert v-if="error" :text="error.message"/>
              <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="show ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-btn :disabled="loading" color="success" class="mr-4 mt-2" :loading="loading" type="submit">
                Sign in
              </v-btn>
            </v-form>

          </v-card-text>
        </v-card>
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
      lazy: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters long'
      ]
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
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/home')
      }
    }
  }
}
</script>
