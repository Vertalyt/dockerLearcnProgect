import { defineStore } from "pinia";
import { useModalStore } from './modalStore'

export const useaAuthStore = defineStore("auth", {
  state: () => ({
    auth: {
      isCheck: false,
      token_info: {},
    },
  }),
  getters: {
    isAuthCheck(state) {
      return state.auth.isCheck;
    },
  },
  actions: {
    async registration({ login, email, password }) {
      try {
        const res = await fetch(`http://localhost:4000/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: login,
            password,
            email,
            group_users: "admin",
          }),
        });

        if (res.ok) {
          const json = await res.json();
          console.log("json.message", json.message);
          this.token;
          // Перенаправляем пользователя на страницу после успешной регистрации
          navigateTo("/login");
        } else {
          console.log("Ошибка при регистрации:", res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async login({ email, password }) {
      const modalStore = useModalStore()
      try {
        const res = await fetch(`http://localhost:4000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            password,
            email,
          }),
        });
        if (!res.ok) {
          if (res.status === 401) {
            modalStore.openModal({
              title: 'Внимание!',
              text: 'Логин или пароль не верны.',
              typeInfo: "AlertMessage",
            });
            setTimeout(() => {
              modalStore.closeModal()
            }, 4000 )
            throw new Error(`Ошибка при авторизации: ${res.statusText}`);
          }
        }
        const json = await res.json();
        this.accessToken({ token: json.token });
        // Перенаправляем пользователя после успешного логина
      } catch (error) {


          console.error(error);

      }
    },
    accessToken({ token_info }) {
      try {
          this.auth.isCheck = true;
          this.auth.token_info = token_info;
          navigateTo("/");
      } catch (error) {
        console.error("Ошибка при обработке токена:", error);
      }
    },
    clearTocken() {
      this.auth = {
        isCheck: false,
        token_info: {},
      }
    }
  },
});
