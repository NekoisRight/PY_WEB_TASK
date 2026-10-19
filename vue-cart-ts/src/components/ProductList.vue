<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

const { searchKeyword, filteredProducts, addToCart, cart } = useCart()

const mouseColor = ref('#f9f9f9')

function handleMouseMove(event: MouseEvent) {
  const x = event.offsetX
  const y = event.offsetY
  const gray = Math.min(255, Math.floor((x + y) / 2))
  mouseColor.value = `rgb(${gray}, ${gray}, ${gray})`
}

function isInCart(product: Product) {
  return cart.value.some(item => item.id === product.id)
}
</script>

<template>
  <div
    class="product-list"
    :style="{ backgroundColor: mouseColor }"
    @mousemove="handleMouseMove"
  >
    <h2>商品列表</h2>
    <input
      v-model="searchKeyword"
      type="text"
      placeholder="搜索商品..."
      @keyup.enter="() => {}"
    />
    
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="product-card"
      :class="{
        selected: isInCart(product),
        disabled: product.stock <= 0,
        'out-of-stock': product.stock === 0
      }"
    >
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>价格: ¥{{ product.price }}</p>
      <p>库存: {{ product.stock }}</p>
      <button
        @click="addToCart(product)"
        :disabled="product.stock <= 0"
      >
        {{ product.stock <= 0 ? '已售罄' : '加入购物车' }}
      </button>
    </div>

    <p v-if="filteredProducts.length === 0">没有找到匹配的商品</p>
  </div>
</template>

<style scoped>
.product-list {
  padding: 20px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.product-card {
  border: 1px solid #ddd;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  transition: all 0.3s;
}

.product-card.selected {
  border-color: #42b983;
  background-color: #e8f5e9;
}

.product-card.disabled {
  opacity: 0.5;
}

.product-card.out-of-stock {
  background-color: #ffebee;
}
</style>
