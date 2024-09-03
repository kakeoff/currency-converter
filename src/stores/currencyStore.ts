import { defineStore } from "pinia";
import { CurrencyEnum } from "../types";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({ mainCurrency: CurrencyEnum.USD }),
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
  },
});
