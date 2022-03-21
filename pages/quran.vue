<template>
  <b-container class="p-3">
    <h1>Quran Page</h1>
    <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
      <b-col v-for="item in surahs" :key="item.number" class="mb-4 pointer">
        <b-card class="radius" border-variant="light">
          <b-row align-h="between" align-v="center" class="pb-3">
            <b-col cols="4" class="number">{{ item.number }}</b-col>
            <b-col cols="4" class="text-right">
              <i @click="bookmark" class="fas fa-bookmark"></i>
            </b-col>
          </b-row>
          <NuxtLink :to="`/surah/${item.number}`">
            <h5>{{ item.name.transliteration.en }}</h5>
          </NuxtLink>
          <p class="text-grey">{{ item.name.translation.id }}</p>
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
      surahs: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$overlay(true);
      this.$axios
        .get("/surah/")
        .then((response) => {
          this.surahs = response.data.data;
          console.log(this.surahs);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$overlay(false);
        });
    },
    bookmark() {
      alert("bookmark");
    },
  },
};
</script>