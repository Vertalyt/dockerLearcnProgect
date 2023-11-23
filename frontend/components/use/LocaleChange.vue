
<template>
        <select v-model="locale">
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
</template>


<script setup>
import { watch, computed } from 'vue'
import { useLanglStore } from '../../stores/langStore'


defineEmits({});
defineProps({})



const { locale } = useI18n();

const langComputed = computed( () => useLanglStore() )
locale.value = langComputed.value.isLangCheck

watch(locale, val => {
    langComputed.value.refrechLang({langFlag: val })
})


</script>

<script>
export default {
  name: 'LocaleChange',
}
</script>

