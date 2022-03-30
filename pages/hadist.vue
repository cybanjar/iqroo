<template>
  <b-container class="p-3">
    <h1 class="py-3">Hadits</h1>
    
    <b-row class="pb-3" align-v="center">
      <b-col cols="12" sm="6" md="6" lg="6" xl="6">
        <b-form-input v-model="search.value" placeholder="Ex: ahmad"></b-form-input>
      </b-col>
    </b-row>

    <h6 class="text-center text-danger pt-5" v-if="books.length === 0">Waiting or check your network</h6>

    <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
      <b-col v-for="item in filteredBooks" :key="item.id" class="mb-4">
        <b-card class="radius" border-variant="light">
          <NuxtLink :to="`/books/${item.id}`">
            <h4>{{ item.name }}</h4>
          </NuxtLink>
          <p> 
            <strong class="text-green">{{ item.available }}</strong> 
            <small>Hadits</small></p>
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
      books: [],
      search: {
        value: ''
      }
    };
  },
  computed: {
    filteredBooks() {
      let tempBooks = this.books

      if (this.search.value.length > 0) {
        tempBooks = tempBooks.filter((item) => {
          return item.id
            .toUpperCase()
            .includes(this.search.value.toUpperCase())
        })
      }
      return tempBooks
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$overlay(true);
      this.$axios
        .get("https://api.hadith.sutanlab.id/books")
        .then((response) => {
          this.books = response.data.data
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$overlay(false);
        });
    },
  },
};
</script>