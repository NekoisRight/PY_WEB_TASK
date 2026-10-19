import { ref, computed, watch } from 'vue'
import type { Product, CartItem } from '../types'

const products = ref<Product[]>([
  { id: 1, name: 'Vue 3 实战', price: 89, stock: 10, description: '前端框架教程' },
  { id: 2, name: 'TypeScript 入门', price: 69, stock: 5, description: '类型系统基础' },
  { id: 3, name: 'Vite 构建工具', price: 49, stock: 0, description: '下一代构建工具' },
  { id: 4, name: 'Pinia 状态管理', price: 59, stock: 8, description: 'Vue 官方状态库' }
])

const cart = ref<CartItem[]>([])
const searchKeyword = ref('')

// 初始化时从 localStorage 读取数据
const saved = localStorage.getItem('cart')
if (saved) {
  try {
    cart.value = JSON.parse(saved)
  } catch (e) {
    console.warn(e)
  }
}

// 搜索过滤计算属性
const filteredProducts = computed(() => {
  const kw = searchKeyword.value.trim().toLowerCase()
  if (!kw) return products.value
  return products.value.filter(p =>
    p.name.toLowerCase().includes(kw) ||
    p.description?.toLowerCase().includes(kw)
  )
})

// 总价计算属性
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 总数量计算属性
const totalCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

// 购物车操作方法
function addToCart(product: Product) {
  if (product.stock <= 0) return
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    if (existing.quantity < product.stock) existing.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter(item => item.id !== id)
}

function clearCart() {
  cart.value = []
}

function updateQuantity(id: number, quantity: number) {
  const item = cart.value.find(item => item.id === id)
  if (item) {
    item.quantity = Math.max(1, Math.min(quantity, item.stock))
  }
}

// 侦听购物车变化，保存到 localStorage
watch(cart, (newVal) => {
  localStorage.setItem('cart', JSON.stringify(newVal))
}, { deep: true, immediate: true })

// 侦听搜索关键字变化
watch(searchKeyword, (newVal, oldVal) => {
  console.log(`搜索关键字从"${oldVal}"变为"${newVal}"`)
})

export function useCart() {
  return {
    products,
    cart,
    searchKeyword,
    filteredProducts,
    totalPrice,
    totalCount,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
  }
}
