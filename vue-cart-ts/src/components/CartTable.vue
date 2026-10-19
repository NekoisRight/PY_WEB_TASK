<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cart, totalPrice, totalCount, removeFromCart, clearCart, updateQuantity } = useCart()
</script>

<template>
  <div class="cart-table">
    <h2>购物车 <span v-if="totalCount > 0">({{ totalCount }} 件)</span></h2>
    
    <table v-if="cart.length > 0">
      <thead>
        <tr>
          <th>商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in cart"
          :key="item.id"
          :class="{ selected: item.quantity > 1 }"
        >
          <td>{{ item.name }}</td>
          <td>¥{{ item.price }}</td>
          <td>
            <input
              type="number"
              min="1"
              :max="item.stock"
              v-model.number="item.quantity"
              @change="updateQuantity(item.id, item.quantity)"
              @click.stop
            />
          </td>
          <td>¥{{ (item.price * item.quantity).toFixed(2) }}</td>
          <td>
            <button @click.stop="removeFromCart(item.id)">移除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>购物车是空的</p>

    <div class="cart-footer" v-if="cart.length > 0">
      <p>总价: ¥{{ totalPrice.toFixed(2) }}</p>
      <button @click.once="clearCart">清空购物车(只触发一次)</button>
    </div>
  </div>
</template>

<style scoped>
.cart-table {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
tr.selected {
  background-color: #f0f9eb;
}
input[type="number"] {
  width: 60px;
}
</style>
