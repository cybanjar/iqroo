<template>
  <b-container fluid>
    <b-row align-h="center" align-v="center">
      <b-col cols="4">
        <div class="login">
          <b-form @submit.prevent="loginUser" @reset="onReset" v-if="show">
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
              ></b-form-input>
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
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="reset" variant="outline-danger">Reset</b-button>
          </b-form>
          <div class="pt-3">
            Not have account?
            <NuxtLink to="register"> Register </NuxtLink>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      login: false,
    }
  },
  mounted () {
  },
  methods: {
    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async loginUser() {
      this.$overlay(true)

      try {
        await this.$fire.auth.signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((response) => {
          console.log(response)
          this.$store.set('session/token', response.user._delegate.accessToken)
          this.$store.set('session/user', response.user._delegate)

          return this.$store.dispatch('session/init')
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.message)
        })
        .then(() => {
          this.$overlay(false)
        })
      } catch (e) {
        console.error(e.message)
      }
    },
  }
}
</script>