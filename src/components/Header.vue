<template>
  <nav
    class="fixed top-0 w-full h-[50px] flex items-center justify-between px-[20px] shadow-md bg-gray-100"
  >
    <span>CURRENCY CONVERTER</span>
    <div class="flex gap-[15px]">
      <router-link class="nav__item" to="/">ГЛАВНАЯ</router-link>
      <router-link class="nav__item" to="/convert">КОНВЕРТАЦИЯ</router-link>
      <select v-model="currentCurrency">
        <option v-for="val in options" :key="val" :value="val">
          {{ val }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { CurrencyEnum } from "../types";
import { ref, watch } from "vue";

const props = defineProps<{
  mainCurrency: CurrencyEnum;
}>();
const emit = defineEmits<{
  setMainCurrency: [val: CurrencyEnum];
}>();

const options = ["USD", "EUR", "RUB"];

const currentCurrency = ref<CurrencyEnum>(props.mainCurrency);

watch(
  () => props.mainCurrency,
  (newVal) => {
    currentCurrency.value = newVal;
  }
);

watch(currentCurrency, (val) => {
  emit("setMainCurrency", val);
});
</script>

<style scoped>
.nav__item {
  @apply hover:-translate-y-[2px] transition duration-200 hover:text-blue-700;
}
</style>
