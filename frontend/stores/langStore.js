import { defineStore } from 'pinia'


export const useLanglStore = defineStore('lang',{
  state: () => ({
    lang: 'en',
  }),
  getters: {
    isLangCheck(state) {
      return state.lang
    },
  },
  actions: {
    refrechLang({langFlag}) {
      this.lang = langFlag
      localStorage.setItem("lang", langFlag);
      return false
    },
  },
  
});

