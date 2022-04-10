<template>
  <b-container id="top" class="p-3">
    <b-row>
      <b-col cols="auto" class="p-3">
          <b-button pill class="mb-2" @click="$router.go(-1)">
        <i class="fas fa-chevron-left mr-2"></i> Back
      </b-button>
      </b-col>
      <b-col cols="auto" class="mx-auto p-3">
        <b-img width="170" fluid src="~assets/image/bismillah.png"/>
      </b-col>
      <b-col cols="auto" class="p-3">
        <b-form-select v-model="ayat" @input="filter(ayat)" :options="options"></b-form-select>
      </b-col>
    </b-row>
    <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
      <b-col v-for="(item, index) in surah" :key="index" class="mb-4">
        <b-card :id="item.number.inSurah" class="radius" border-variant="light">
          <b-row align-h="between" align-v="start" class="pb-3">
            <b-col cols="12" sm="2" md="2" lg="2" xl="2" class="number">{{ item.number.inSurah }}/{{ total }}</b-col>
            <b-col cols="12" sm="9" md="9" lg="9" xl="9" class="text-right text-arab">{{ item.text.arab }}</b-col>
          </b-row>
          <p class="text-grey">{{ item.translation.id }}</p>
          <b-button class="no-padding mb-2" variant="link" @click="showTafsir(item)">Tafsir</b-button>
          <div>
            <audio controls>
              <source :src="item.audio.primary" type="audio/mpeg">
            </audio>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <div @click="scrollTop" class="scrollTop">
      <i class="fas fa-arrow-up"></i>
    </div>
  </b-container>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
export default {
  data() {
    return {
      surah: [],
      ayat: 1
    };
  },
  computed: {
    total() {
      return this.surah.length
    },
    options(val) {
      return _.map(this.surah, (item) => {
        return {
          value  : item.number.inSurah,
          text   : item.number.inSurah,
        }
      })
    },
  },
  watch: {

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
          title: val.translation.id,
          headerClass: 'p-3 border-bottom-0',
          footerClass: 'p-3 border-top-0',
          centered: true
        })
    },
    filter(val) {
      const value      = parseInt(val)

      $('html, body').animate({ scrollTop: $(`#${value}`).offset().top + -20 }, 500)
    },
    scrollTop() {
      $('html, body').animate({ scrollTop: $('#top').offset().top + 0 }, 500)
    }
  },
};
</script>