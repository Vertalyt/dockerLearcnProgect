import { useaAuthStore } from '../stores/authStore'
import { computed } from 'vue'

const authStore = computed(() => useaAuthStore() )  

// Ваш middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const token = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (to.meta.auth === true && token) {
      authStore.value.accessToken({ token });
    } else {
      // Обработка отсутствия токена, например, редирект на страницу логина
      return navigateTo('/login?auth=false');
    }
  }
});
