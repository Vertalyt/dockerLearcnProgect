import { defineStore } from 'pinia'


export const useModalStore = defineStore('modal',{
  state: () => ({
    isOpen: false,
    modalData: null,
  }),
  getters: {
    isOpenModal(state) {
      return state.isOpen
    },
    isDateModal(state) {
      return state.modalData
    },
    tapeModalInfo(state) {
      return state.modalData?.typeInfo
    },
  },
  actions: {
    openModal(data) {
      this.isOpen = true;
      this.modalData = data;
    },
    closeModal() {
      this.isOpen = false;
      this.modalData = null;
    },
  },
  
});