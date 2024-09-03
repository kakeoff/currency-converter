<template>
  <section class="w-full h-full flex justify-center items-center">
    <div
      class="bg-gray-100 text-[20px] p-[20px] mt-[50px] min-w-[360px] flex flex-col items-start rounded-[12px] shadow-md"
    >
      <h2 class="text-2xl text-[25px] font-bold mb-6 w-full text-center">
        Конвертер валют
      </h2>
      <p class="text-center w-full" v-if="isLoading">Загрузка...</p>
      <div v-else>
        <div class="flex flex-col">
          <div class="flex">
            <select
              v-model="currencyFrom"
              @change="convert"
              class="mr-4 p-2 border border-gray-300 rounded"
            >
              <option
                v-for="currency in currencies"
                :key="currency"
                :value="currency"
              >
                {{ currency }}
              </option>
            </select>
            <input
              type="text"
              v-model="amountFrom"
              @input="handleInput('from')"
              placeholder="Введите сумму"
              class="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <p class="text-red-500 h-[30px] flex items-center text-sm">
            {{ errorFrom }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex">
            <select
              v-model="currencyTo"
              @change="convert"
              class="mr-4 p-2 border border-gray-300 rounded"
            >
              <option
                v-for="currency in currencies"
                :key="currency"
                :value="currency"
              >
                {{ currency }}
              </option>
            </select>
            <input
              type="text"
              v-model="amountTo"
              @input="handleInput('to')"
              placeholder="Введите сумму"
              class="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <p class="text-red-500 h-[30px] flex items-center text-sm">
            {{ errorTo }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, Ref, ComputedRef } from "vue";
import { useCurrencyStore } from "../stores/currencyStore";
import { CurrencyEnum } from "../types";

type ExchangeRates = {
  [key: string]: number;
};

const currencyStore = useCurrencyStore();
const currencies: CurrencyEnum[] = Object.values(CurrencyEnum);
const currencyFrom: Ref<CurrencyEnum> = ref(CurrencyEnum.RUB);
const currencyTo: Ref<CurrencyEnum> = ref(CurrencyEnum.USD);
const amountFrom = ref<string | number>("");
const amountTo = ref<string | number>("");
const errorFrom = ref<string | null>(null);
const errorTo = ref<string | null>(null);

const exchangeRates: ComputedRef<ExchangeRates | null> = computed(
  () => currencyStore.exchangeRates
);
const isLoading: ComputedRef<boolean> = computed(() => !exchangeRates.value);

const convert = () => {
  if (!isValidNumber(amountFrom.value)) return;
  const rate = getExchangeRate(currencyFrom.value, currencyTo.value);
  amountTo.value = rate ? roundToTwo(Number(amountFrom.value) * rate) : "";
};

const getExchangeRate = (from: string, to: string): number | null => {
  if (from === to) return 1;
  if (!exchangeRates.value) return null;
  const rateKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
  return exchangeRates.value[rateKey] || null;
};

const handleInput = (source: "from" | "to") => {
  clearErrors();
  if (source === "from") {
    if (!isValidNumber(amountFrom.value)) {
      errorFrom.value = "Введите корректное число";
      amountTo.value = "";
      return;
    }
    convert();
  } else {
    if (!isValidNumber(amountTo.value)) {
      errorTo.value = "Введите корректное число";
      amountFrom.value = "";
      return;
    }
    const rate = getExchangeRate(currencyTo.value, currencyFrom.value);
    amountFrom.value = rate ? roundToTwo(Number(amountTo.value) * rate) : "";
  }
};

const isValidNumber = (value: string | number): boolean => {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return (
      trimmedValue === "" ||
      (!isNaN(parseFloat(trimmedValue)) && isFinite(parseFloat(trimmedValue)))
    );
  } else if (typeof value === "number") {
    return !isNaN(value) && isFinite(value);
  }
  return false;
};

const clearErrors = (): void => {
  errorFrom.value = null;
  errorTo.value = null;
};

const roundToTwo = (num: number): string => {
  return num.toFixed(2);
};

watch([currencyFrom, currencyTo], convert);
</script>
