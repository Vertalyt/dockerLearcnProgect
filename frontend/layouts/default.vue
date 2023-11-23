<template>
  <div class="container-fluid py-4 px-3 mx-auto">
    <div class="row" style="height: 90vh">
      <div class="col-xs-4 col-sm-3 col-xl-2 col-xxl-2 text-bg-light">

        <ProfileIcon />
        <MainMenu />
      </div>

      <div
        class="col-12 col-xs-12 col-sm-9 col-xl-10 col-xxl-10 color_Bg_Conteiner"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import MainMenu from "../components/use/MainMenu.vue";
import ProfileIcon from '../components/use/ProfileIcon.vue'

defineEmits({});
defineProps({});
</script>

<script>
export default {
  name: "MainLayout",
};
</script>

<style scoped>
.color_Bg_Conteiner {
  position: relative;
  /* Добавляем паддинг, чтобы учесть место для тени */
  padding: 20px;
  background-color: #f0f3f5;
  box-shadow: inset 0px 0px 1.5rem rgba(0, 0, 0, 0.4);
}
</style>
