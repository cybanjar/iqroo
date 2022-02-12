<template>
  <div class="loading-overlay" v-if="loading">
    <div class="loading-container">
      <img class="loading-item" src="@/assets/image/icon.svg" alt="Icon Privy" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loading: {
      get() {
        return this.$store.get("overlay");
      },
      set(val) {
        return this.$store.set("overlay", val);
      },
    },
  },
};
</script>
