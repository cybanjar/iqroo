<template>
  <b-container class="p-3">
    <b-button pill variant="info" class="mb-2" @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2"></i> Back
    </b-button>
    <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
      <b-col v-for="(item, index) in surah" :key="index" class="mb-4">
        <b-card class="radius" border-variant="light">
          <b-row align-h="between" align-v="start" class="pb-3">
            <b-col cols="2" class="number">{{ item.number.inSurah }}/{{ total }}</b-col>
            <b-col cols="9" class="text-right text-arab">{{ item.text.arab }}</b-col>
          </b-row>
          <h5>English - Sahih International | See Tafsir</h5>
          <p class="text-grey">{{ item.translation.id }}</p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      surah: [],
    };
  },
  computed: {
    total() {
      return this.surah.length;
    },
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
          this.surah = response.data.data.verses;
          console.log(this.surah);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$overlay(false);
        });
    },
    back() {
      return this.$router.go(-1);
    },
  },
};
</script>