<template>
    <v-alert dismissible type="error" @input="onClose">
      {{ text }}
    </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
