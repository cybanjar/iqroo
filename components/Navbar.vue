<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/">
        <b-img
          class="logo"
          src="~assets/image/logo.png"
          fluid />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-item active href="#">
            <nuxt-link to="/quran">Al-Qur'an</nuxt-link>
          </b-nav-item>
          <b-nav-item href="#">
            <nuxt-link to="/hadist">Hadist</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/about">About</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- <b-navbar-nav v-if="!auth" right>
          <b-nav-item>
            <nuxt-link to="/login">Login</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown v-else right>
          <template #button-content>
            User
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logoutUser">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$cookies.get('session/token')
    },
  },
  methods: {
    async logoutUser() {
      await this.$fire.auth.signOut()
      .then(() => {
        this.$cookies.remove('session/token')
        this.$cookies.remove('session/user')

        this.$router.replace("/login")
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
  }
}
</script>
