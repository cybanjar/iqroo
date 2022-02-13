<template>
  <div>
    <h5>{{ $route.params }}</h5>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      surah: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$overlay(true);
      this.$axios
        .get(`/surah/${this.$route.params.number}`)
        .then((response) => {
          this.surah = response.data.data;
          console.log(this.surah);
        })
        .catch((err) => {
          console.error(err);
        });
      this.$overlay(false);
    },
  },
};
</script>