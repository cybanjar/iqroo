<template>
  <b-container class="p-3">
    <b-row
      align-h="between"
      align-v="center">
      <b-col
        cols="6"
        xl="2"
        class="mr-auto p-3">
        <b-button
          pill
          class="mb-2"
          @click="$router.go(-1)">
          <i class="fas fa-chevron-left mr-2"/> Back
        </b-button>
      </b-col>
      <b-col
        cols="6 mx-auto"
        xl="3"
        class="p-3">
        <h5 class="text-capitalize">HR. {{ $route.params.id }}</h5>
      </b-col>
      <b-col
        cols="4"
        xl="3"
        class="p-3">
        <b-form-group
          label="Mode"
          v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="search.number"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="true">Number</b-form-radio>
          <b-form-radio
            v-model="search.number"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="false">Range</b-form-radio>
        </b-form-group>
      </b-col>
      <b-col
        v-if="search.number"
        cols="6"
        xl="3"
        class="p-3">
        <label for="number">Number hadist</label>
        <b-form-input
          @keypress.enter="load"
          id="number"
          v-model="params.number"
          placeholder="Number"
          type="number"
          trim />
      </b-col>

      <b-col
        v-if="!search.number"
        cols="4"
        xl="2"
        class="p-3">
        <label
          for="from"
          class="text-grey">Hadist from</label>
        <b-form-input
          @keypress.enter="load"
          id="from"
          v-model="params.range.from"
          placeholder="From"
          type="number"
          trim />
      </b-col>
      <b-col
        v-if="!search.number"
        cols="4"
        xl="2"
        class="p-3">
        <label
          for="to"
          class="text-grey">Hadist to</label>
        <b-form-input
          @keypress.enter="load"
          id="to"
          v-model="params.range.to"
          type="number"
          placeholder="To"
          trim />
      </b-col>
    </b-row>

    <h6
      class="text-center text-danger pt-5"
      v-if="data.length === 0">Waiting or check your network</h6>

    <b-row
      v-if="search.number && modeNumber"
      cols="1"
      cols-sm="1"
      cols-md="1"
      cols-lg="1">
      <b-col class="mb-4">
        <b-card
          class="radius"
          border-variant="light">
          <b-row
            align-h="between"
            align-v="start"
            class="pb-3">
            <b-col cols="2">
              <p
                class="number"
                v-text="modeNumber.number"/>
            </b-col>
            <b-col
              cols="9"
              class="text-right">
              <h4
                v-text="modeNumber.arab"
                class="text-right text-arab"/>
            </b-col>
          </b-row>
          <p
            v-text="modeNumber.id"
            class="caption"/>
          <div><i class="fas fa-bookmark"/></div>
        </b-card>
      </b-col>
    </b-row>

    <b-row
      v-if="!search.number"
      cols="1"
      cols-sm="1"
      cols-md="1"
      cols-lg="1">
      <b-col
        v-for="item in data.hadiths"
        :key="item.id"
        class="mb-4">
        <b-card
          class="radius"
          border-variant="light">
          <b-row
            align-h="between"
            align-v="start"
            class="pb-3">
            <b-col
              cols="12"
              sm="2"
              md="2"
              lg="2"
              xl="2"
              class="number">
              {{ item.number }}
            </b-col>
            <b-col
              cols="12"
              sm="9"
              md="9"
              lg="9"
              xl="9"
              class="text-right">
              <h4 class="text-right text-arab">{{ item.arab }}</h4>
            </b-col>
          </b-row>
          <p
            v-html="item.id"
            class="caption"/>
          <div><i class="fas fa-bookmark"/></div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      data  : [],
      params: {
        range: {
          from: 1,
          to  : 10,
        },
        number: 1,
      },
      search: { number: false },
      api   : '',
    }
  },
  computed: {
    modeNumber () {
      return this.data.contents
    },
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.$overlay(true)
      this.data = []

      const params = {
        id    : this.$route.params.id,
        from  : this.params.range.from,
        to    : this.params.range.to,
        number: this.params.number,
      }

      if (this.search.number)
        this.api = `https://api.hadith.sutanlab.id/books/${params.id}/${params.number}`

      if (!this.search.number)
        this.api = `https://api.hadith.sutanlab.id/books/${params.id}?range=${params.from}-${params.to}`

      this.$axios
        .get(`${this.api}`)
        .then((response) => {
          this.data = response.data.data
        })
        .catch((err) => {
          console.error(err.message)
        })
        .then(() => {
          this.$overlay(false)
        })
    },
  },
}
</script>
