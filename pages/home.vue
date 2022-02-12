<template>
  <div>
    Home
    <button type="button" @click="increment">Plus</button>
  </div>
</template>

<script>
export default {
  computed: {},
  mounted() {
    console.log("mounted");
  },
  methods: {
    increment() {
      return this.$overlay(true);
    },
  },
};
</script>