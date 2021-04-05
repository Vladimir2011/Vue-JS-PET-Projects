<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Nuxt SSR</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <nuxt-link exact no-prefetch active-class="active" class="nav-link" aria-current="page" to="/">
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" aria-current="page" to="/about">
            About
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" aria-current="page" to="/users">
            Users
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="!hasToken">
          <nuxt-link active-class="active" class="nav-link" aria-current="page" to="/login">
            Login
          </nuxt-link>
        </li>
        <li class="nav-item" v-else>
          <a @click.prevent="logout" class="nav-link" aria-current="page" href="#">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    hasToken() {
      return this.$store.getters.hasToken
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
