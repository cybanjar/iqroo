<template>
  <b-container class="p-3">
    <h1>Al-Qur'an</h1>

    <b-row class="py-3" align-v="center">
      <b-col cols="12" sm="12" md="12" lg="3" xl="3">
        <b-form-input v-model="search.value" placeholder="Ex: al-fatihah"></b-form-input>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="9" xl="9">
        <Popular />
      </b-col>
    </b-row>
    <h6 class="text-center text-danger pt-5" v-if="surahs.length === 0">Waiting or check your network</h6>
    <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
      <b-col v-for="item in filtedSurah" :key="item.number" class="mb-4">
        <b-card class="radius" border-variant="light">
          <b-row align-h="between" align-v="center" class="pb-3">
            <b-col cols="4" class="number">{{ item.number }}</b-col>
            <b-col cols="4" class="text-right">
              <i @click="bookmark" class="fas fa-bookmark"></i>
            </b-col>
          </b-row>
          <NuxtLink :to="`/surah/${item.number}`">
            <h5>{{ item.name.transliteration.id }}</h5>
          </NuxtLink>
          <p class="text-grey">{{ item.name.translation.id }}</p>
          <b-button class="no-padding" variant="link"  @click="showTafsir(item)">Tafsir</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Popular from '@/components/pages/Popular'
import _ from "lodash";
export default {
  components: {
    Popular
  },
  data() {
    return {
      surahs: [],
      search: {
        value: ''
      }
    };
  },
  computed: {
    filtedSurah() {
      let tempSurahs = this.surahs

      if (this.search.value.length > 0) {
        tempSurahs = tempSurahs.filter((item) => {
          return item.name.transliteration.id
            .toUpperCase()
            .includes(this.search.value.toUpperCase())
        })
      }
      return tempSurahs
    }
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
        })
        .then(() => {
          this.$overlay(false);
        });
    },
    bookmark() {
      alert("bookmark");
    },
    showTafsir(item) {
      this.$bvModal.msgBoxOk(item.tafsir.id, {
          title: item.name.transliteration.id,
          headerClass: 'p-3 border-bottom-0',
          footerClass: 'p-3 border-top-0',
          centered: true
        })
    }
  },
};
</script>