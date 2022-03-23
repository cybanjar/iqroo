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
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>