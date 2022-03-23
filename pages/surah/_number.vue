<template>
  <b-container class="p-3">
    <b-row>
      <b-col cols="auto" class="mr-auto p-3">
          <b-button pill class="mb-2" @click="$router.go(-1)">
        <i class="fas fa-chevron-left mr-2"></i> Back
      </b-button>
      </b-col>
      <b-col cols="auto" class="p-3">
        <b-img width="170" fluid src="~assets/image/bismillah.png"/>
      </b-col>
    </b-row>
    <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
      <b-col v-for="(item, index) in surah" :key="index" class="mb-4">
        <b-card class="radius" border-variant="light">
          <b-row align-h="between" align-v="start" class="pb-3">
            <b-col cols="2" class="number">{{ item.number.inSurah }}/{{ total }}</b-col>
            <b-col cols="9" class="text-right text-arab">{{ item.text.arab }}</b-col>
          </b-row>
          <p class="text-grey">{{ item.translation.id }}</p>
          <b-button class="no-padding" variant="link" @click="showTafsir(item)">Tafsir</b-button>
          <div>
            <audio controls>
              <source :src="item.audio.primary" type="audio/mpeg">
            </audio>
          </div>
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
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$overlay(false);
        });
    },
    showTafsir(val) {
      this.$bvModal.msgBoxOk(val.tafsir.id.long, {
          centered: true
        })
    }
  },
};
</script>