import { defineStore } from "pinia";
import * as api from "../services/neuralGeneration.service";
import { ExchangeRatesResponse } from "../services/types/neuralGeneration";
import { CurrencyEnum } from "../types";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    mainCurrency: CurrencyEnum.USD,
    exchangeRates: null as ExchangeRatesResponse | null,
  }),
  actions: {
    setMainCurrency(val: CurrencyEnum) {
      this.mainCurrency = val;
      localStorage.setItem("mainCurrency", val);
    },
    getMainCurrency() {
      const storedVal: CurrencyEnum | null = localStorage.getItem(
        "mainCurrency"
      ) as CurrencyEnum | null;
      this.mainCurrency = storedVal ? storedVal : CurrencyEnum.USD;
    },
    async fetchCurrency() {
      const data: ExchangeRatesResponse = await api.fetchCurrency();
      this.exchangeRates = data;
    },
  },
});
