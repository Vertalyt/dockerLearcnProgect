
<template>
   <div class="card p-2">
   <h5>{{ $t('SuredeleteOrder') }}</h5>
    <div class="d-flex">
      <img :src="`./img/${items.photo}`" class="card-img-top deleteImgOrder" :alt="items.title" />
      <p>{{ items.title }}</p>
    </div>




    <div class="modal-footer">
      <button
            @click="$emit('closeModal')"
            type="button"
            class="btn btn-secondary me-3"
            data-bs-dismiss="modal"
          >
            {{ $t('Cancel') }}
          </button>


          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="deleteProducs({ id: items.id, order: items.order_id })"
          >
          {{ $t('Confirm') }}
          </button>
        </div>


  </div>
</template>


<script setup>
import { useOrdersStore } from '../../stores/ordersStore'

const emits = defineEmits({
  closeModal: null
});
defineProps({
  items: {
    requared: true,
    type: Object
  }
})

const ordersStore = useOrdersStore()

const deleteProducs = ({ id, order }) => {
 ordersStore.deleteProducs({ id, order })
 emits('closeModal')
}

</script>

<script>
export default {
  name: 'ProducsDelete',
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}

.deleteImgOrder {
  width: 50px;
  margin: 1rem;
}
</style>