<template>
  <section class="w-full h-full flex justify-center items-center">
    <div
      class="bg-gray-100 text-[20px] p-[20px] mt-[50px] flex flex-col items-center rounded-[12px] w-[300px] shadow-md"
    >
      <h2 class="text-[25px] font-bold mb-4 text-center">Курсы валют</h2>
      <p v-if="isLoading">Загрузка...</p>
      <ul v-else>
        <li
          v-for="(rate, currency) in exchangeRates"
          :key="currency"
          class="exchange-rate-item"
        >
          {{ rate }}
        </li>
      </ul>
      <p></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { useCurrencyStore } from "../stores/currencyStore";
import { CurrencyEnum } from "../types";

const currencyStore = useCurrencyStore();

const isLoading: ComputedRef<boolean> = computed(() => {
  return !currencyStore.exchangeRates;
});

const exchangeRates: ComputedRef<Record<CurrencyEnum, string>> = computed(
  () => {
    const baseCurrency = currencyStore.mainCurrency;
    const rates = currencyStore.exchangeRates;
    const result: Record<CurrencyEnum, string> = {
      [CurrencyEnum.USD]: "",
      [CurrencyEnum.EUR]: "",
      [CurrencyEnum.RUB]: "",
    };

    if (!rates) return result;

    if (baseCurrency === "RUB") {
      result[CurrencyEnum.USD] = `1 USD = ${rates["usd-rub"]} RUB`;
      result[CurrencyEnum.EUR] = `1 EUR = ${rates["eur-rub"]} RUB`;
    } else if (baseCurrency === "USD") {
      result[CurrencyEnum.RUB] = `1 RUB = ${rates["rub-usd"]} USD`;
      result[CurrencyEnum.EUR] = `1 EUR = ${rates["eur-usd"]} USD`;
    } else if (baseCurrency === "EUR") {
      result[CurrencyEnum.RUB] = `1 RUB = ${rates["rub-eur"]} EUR`;
      result[CurrencyEnum.USD] = `1 USD = ${rates["usd-eur"]} EUR`;
    }

    return result;
  }
);
</script>
