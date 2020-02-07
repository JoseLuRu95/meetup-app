<template>
  <v-container>
    <v-row justify="center" class="mt-6">
      <v-col cols="11" sm="7" md="6" lg="4" class="elevation-3">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy" class="ma-4" @submit.prevent="validate">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
            :type="show ? 'text' : 'password'" :rules="passwordRules"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
            required
          ></v-text-field>
          <v-text-field :rules="[comparePassword]"
            v-model="confirmpassword"
            type="password"
            name="confirmPassword"
            label="Confirm password"
            required
          ></v-text-field>
          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Did you become hollow?" required></v-checkbox>
          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            Sign up
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
      confirmpassword: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password reqired',
        v => (v && v.length >= 8)
      ],
      checkbox: false,
      lazy: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {

      }
    }
  },
  computed: {
    comparePassword () {
      return this.password !== this.confirmpassword ? 'Passwords do not match' : true
    }
  }
}
</script>
