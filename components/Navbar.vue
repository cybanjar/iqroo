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

        <b-navbar-nav right>
          <b-nav-item>
            <nuxt-link to="/login">Login</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>