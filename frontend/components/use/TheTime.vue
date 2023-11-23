
<template>
  <div>
    {{ date }}
  </div>
</template>


<script setup>
import { onBeforeUnmount } from 'vue'

defineEmits({});
defineProps({})


const interval = ref();
const date = ref();

// Внутри асинхронной функции, например, setup
async function fetchServerDataAndDate() {
  try {
    const response = await $fetch(`http://192.168.1.161:4000/getServerTime`);
    date.value = dateFilter(response, "datetime");
  } catch (error) {
    console.error("Error fetching server time:", error);
  }
}

// Вызываем fetchData сразу при загрузке компонента
fetchServerDataAndDate();

// Устанавливаем интервал для обновления времени каждую секунду
interval.value = setInterval(async () => {
  await fetchServerDataAndDate(); // Обновляем время с сервера и форматируем его
}, 1000);

// Очищаем интервал при уничтожении компонента
onBeforeUnmount(() => {
  clearInterval(interval.value);
});


</script>

<script>
export default {
  name: 'TheTime',
}
</script>

