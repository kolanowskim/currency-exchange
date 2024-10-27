import { useEffect, useState } from "react";

export function useExchangeRate(): number | null {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRate() {
      const response = await fetch("http://localhost:4000/exchange/rate");
      const rate = await response.json();
      setRate(rate);
    }
    fetchRate();
  }, []);

  return rate;
}
