<template>
  <nav class="navbar" style="height: 10vh">
    <div class="container d-flex justify-content-between">
      <div class="col-6 d-flex justify-content-around">
        <a class="navbar-brand col-2" href="#">Navbar</a>
        <slot name="searhHead" />
      </div>

      <div class="col-4 d-flex justify-content-between">
        <TheTime 
        :key="refrechTime"
        />
        <ClientOnly>
          <SessionsCount />
        </ClientOnly>
        <LocaleChange />
      </div>
    </div>
  </nav>
</template>

<script setup>
import SessionsCount from "./SessionsCount.vue";
import LocaleChange from "./use/LocaleChange.vue";
import TheTime from './use/TheTime.vue'

import { ref, computed, watch } from "vue";
import { dateFilter } from "../utils/data-filter.js";

import { useLanglStore } from "../stores/langStore";


defineEmits({});
defineProps({});

const refrechTime = ref(1)
const storeLang = computed( () => useLanglStore().isLangCheck )

watch( storeLang, _ => {
  refrechTime.value++
} )

</script>

<script>
export default {
  name: "AppHead",
};
</script>
../utils/data-filter.js
