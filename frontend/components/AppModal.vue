<template>
  <div class="modalWR" @click.stop="$emit('closeModal')"></div>
  <div class="modal-content">
    <span @click="$emit('closeModal')" class="close">&times;</span>

    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5 mb-3" id="staticBackdropLabel">
            {{ modalStore.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('closeModal')"
          ></button>
        </div>


        <div class="modal-body">
          
          <slot name="modalBody" :bodyInfo="modalStore"> </slot>

        </div>


      </div>
    </div>
  </div>

</template>

<script setup>
import { computed } from "vue";
import { useModalStore } from "../../stores/modalStore";



const modalStore = computed(() => useModalStore().isDateModal);

defineEmits({
  closeModal: null,
});
defineProps({});
</script>

<script>
export default {
  name: "AppModal",
};
</script>

<style scoped>
.show {
  display: block;
}

.bgWrapper {
  width: 100vw;
  height: 100vh;
  background-color: #ad906a47;
  z-index: 51;
  position: fixed;
}

.modalWR {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1718189e;
  z-index: 50;
}

.modal-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 12%;
  z-index: 50;
  margin: 0 auto;
  max-height: 90%;
  background-color: white;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  width: 500px;
}

</style>
