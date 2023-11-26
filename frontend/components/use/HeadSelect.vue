
<template>
          <div class="col-4 d-flex mx-auto mb-4">
            <p class="m-auto pe-3">{{ $t(name) }}:</p>
            <select 
            @change="selectChange"
            v-model="selectModel"
            class="form-select" 
            aria-label="Default select example"
            >
              <option value="choose" selected>Choose</option>
              <option 
              v-for="item in selectItems"
              :key="item.id"
              :value="item.id">{{ item.title }}</option>
            </select>
          </div>
          
</template>


<script setup>
import { ref } from 'vue'

const emits = defineEmits({
  selectChange: Object,
});
const props = defineProps({
  selectItems: {
    requared: true,
    type: Array
  },
  nameSelect: {
    requared: true,
    type: String
  },
})

const typeSelect = [
  { type: 'orders', name: 'Orders' },
  { type: 'Specification', name: 'Specification' },
]

const typeSelectOptions = typeSelect.find(item => item.type === props.nameSelect)
const name = typeSelectOptions.name

const selectModel = ref('choose')

const selectChange = () => {
  emits('selectChange', { id: selectModel.value, type: typeSelectOptions.type } )
}

</script>

<script>
export default {
  name: 'HeadSelect',
}
</script>