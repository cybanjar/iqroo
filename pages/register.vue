<template>
  <b-container fluid>
    <b-row
      align-h="center"
      align-v="center">
      <b-col cols="4">
        <div class="login">
          <b-form
            @submit.prevent="createUser"
            @reset="onReset"
            v-if="show">
            <b-form-group
              id="input-email"
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
              />
            </b-form-group>

            <b-form-group
              id="input-password"
              label="Password"
              label-for="password"
            >
              <b-form-input
                type="password"
                id="password"
                v-model="form.password"
                required
              />
            </b-form-group>

            <b-button
              type="submit"
              variant="primary">Register</b-button>
            <b-button
              type="reset"
              variant="outline-danger">Reset</b-button>
          </b-form>
          <div class="pt-3">
            Have account?
            <NuxtLink to="login"> Login </NuxtLink>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    return {
      form: {
        email   : '',
        password: '',
      },
      show : true,
      login: false,
    }
  },
  mounted () {
    this.initFirebase()
  },
  methods: {
    initFirebase () {

    },
    onReset (event) {
      event.preventDefault()
      this.form.email    = ''
      this.form.password = ''
      this.show          = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async createUser () {
      this.$overlay(true)

      try {
        await this.$fire.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((response) => {
            this.$router.push('/login')
          })
          .catch((err) => {
            console.error(err.message)
          })
          .then(() => {
            this.$overlay(false)
          })
      } catch (err) {
        console.error(err.message)
      }
    },
  },
}
</script>
