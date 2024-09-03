import { ExchangeRatesResponse } from "./types/neuralGeneration";

const url = "https://status.neuralgeneration.com/api/currency";

export async function fetchCurrency(): Promise<ExchangeRatesResponse> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ExchangeRatesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
