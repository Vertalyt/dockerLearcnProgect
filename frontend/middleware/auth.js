import { useaAuthStore } from "../stores/authStore";
import { computed } from "vue";
import { jwtDecode } from "jwt-decode";

const authStore = computed(() => useaAuthStore());

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (to.meta.auth === true && token) {
      const decodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000); // текущее время в секундах
      if (currentTimestamp >= decodedToken.exp) {
        console.log("Токен просрочен");
        authStore.clearTocken
        return navigateTo("/login?auth=false");
      } else {
        authStore.value.accessToken({ token_info: decodedToken });
      }
    } else {
      // Обработка отсутствия токена
      return navigateTo("/login?auth=false");
    }
  }
});
