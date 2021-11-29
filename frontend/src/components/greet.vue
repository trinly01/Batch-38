<template>
  <div>
    <q-input v-model="displayName" />
    <q-btn @click="updateValue">save</q-btn>
    <q-btn @click="updateParent">updateParent</q-btn>
    Hello {{ modelValue || name }}
  </div>
</template>

<script>
export default {
  props: ['fname', 'lname', 'modelValue'],
  data () {
    return {
      displayName: this.modelValue
    }
  },
  methods: {
    updateValue () {
      this.$emit('update:modelValue', this.displayName + ' pogi')
    },
    updateParent () {
      this.$emit('updateParent', this.displayName + ' pogi')
    }
  },
  computed: {
    name () {
      return `${this.fname} ${this.lname}`
    }
  }
}
</script>
