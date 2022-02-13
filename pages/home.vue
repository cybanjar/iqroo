<template>
  <b-container class="p-3">
    <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
      <b-col v-for="item in surahs" :key="item.number" class="mb-4 pointer">
        <NuxtLink :to="`/surah/${item.number}`">
          <b-card class="radius" border-variant="light">
            <b-row align-h="between" class="pb-3">
              <b-col cols="4" class="number">{{ item.number }}</b-col>
              <b-col cols="4" class="text-right">Love</b-col>
            </b-row>
            <h5>{{ item.name.transliteration.en }}</h5>
            <p class="text-grey">{{ item.revelation.en }}</p>
          </b-card>
        </NuxtLink>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
        })
        .catch((err) => {
          console.error(err);
        });
      this.$overlay(false);
    },
    detail(row) {
      // tidak terpakai
      return this.$router.push(`/surah/${row.number}`);
    },
  },
};
</script>