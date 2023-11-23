
<template>
        <ul class="navbar-nav d-flex align-items-center">
          <li 
          v-for="list in menuMap"
          :key="list.name"
          class="nav-item mb-2"
          >
            <router-link
              class="nav-link top-50 start-50 pb-1"
              exact-active-class="active"
              aria-current="page"
              :to="list.url"
              >{{ $t(list.name) }}</router-link
            >
          </li>
        </ul>
</template>


<script setup>
defineEmits({});
defineProps({})


const menuMap = [
  { url: '/', name: 'Coming', },
  { url: '/theproducs', name: 'Products' },
  { url: '/register', name: 'Register' },
  { url: '/login', name: 'Login' },
]

</script>

<script>
export default {
  name: 'MainMenu',
}
</script>


<style scoped>
.active {
  border-bottom: 2px solid green;
}

</style>