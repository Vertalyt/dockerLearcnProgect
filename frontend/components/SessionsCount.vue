
<template>
      <div v-if="activeSessions > 0" class="col-2 d-flex justify-content-end">Сесии {{ activeSessions }}</div>
</template>


<script setup>
import io from 'socket.io-client';

defineEmits({});
defineProps({})


const socket = io("http://192.168.1.161:4000", {
  withCredentials: true,
});
const activeSessions = ref(0)

// //Обработчик события успешного соединения
socket.on('connect', () => {
  console.log('Connected to the server');
  // Теперь можно проверить соединение и зарегистрировать обработчик события
  if(socket.connected) {
    socket.on('updateCounter', (count) => {
      activeSessions.value = count;
    });
  }
});

// //Обработчик события разрыва соединения
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
  // Можно добавить логику для обработки разрыва соединения
});


// Добавляем обработчик события перед закрытием вкладки или перезагрузкой страницы
if (process.client) {
  window.addEventListener('beforeunload', () => {
    // Вызываем метод для разрыва соединения
    socket.disconnect();
  });
}

</script>

<script>
export default {
  name: 'SessionsCount',
}
</script>

