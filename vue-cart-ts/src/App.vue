<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductList from './components/ProductList.vue'
import CartTable from './components/CartTable.vue'
import { useCart } from './composables/useCart'

const { totalPrice, totalCount } = useCart()

const discount = ref(1)

const finalPrice = computed({
  get: () => totalPrice.value * discount.value,
  set: (val: number) => {
    if (totalPrice.value > 0) {
      discount.value = val / totalPrice.value
    }
  }
})
</script>

<template>
  <div class="app">
    <h1>Vue 3 + TS 模拟购物车</h1>
    <ProductList />
    <CartTable />
    
    <div class="discount-panel">
      <label>
        折扣:
        <input
          type="number"
          v-model.number="discount"
          step="0.1"
          min="0"
          max="1"
        />
      </label>
      <label>
        最终总价:
        <input
          type="number"
          v-model.number="finalPrice"
          step="1"
        />
      </label>
    </div>

    <p>
      总数量: {{ totalCount }}, 
      总价: ¥{{ totalPrice.toFixed(2) }}, 
      折后: ¥{{ finalPrice.toFixed(2) }}
    </p>
  </div>
</template>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.discount-panel {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.discount-panel label {
  margin-right: 20px;
}
</style>
