import { useExchangeRate } from '../hooks/useExchangeRate';
import { fetchTransaction } from '../hooks/useTransaction';
import { useState, FormEvent } from 'react';

export default function Home() {
  const rate = useExchangeRate();
  const [eurAmount, setEurAmount] = useState<string>('');
  const [plnAmount, setPlnAmount] = useState<number | null>(null);

  const handleExchange = async (event: FormEvent) => {
    event.preventDefault();
    const amount = parseFloat(eurAmount);
    if (!isNaN(amount) && amount > 0) {
      const result = await fetchTransaction(amount);
      setPlnAmount(result);
    }
  };

  return (
    <div>
      <h1>Currency Exchange</h1>
      <p>Current EUR to PLN Rate: {rate !== null ? rate : 'Loading...'}</p>
      <form onSubmit={handleExchange}>
        <label>
          Amount in EUR:
          <input
            type="number"
            value={eurAmount}
            onChange={(e) => setEurAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Convert to PLN</button>
      </form>
      {plnAmount !== null && (
        <p>
          {eurAmount} EUR is approximately {plnAmount.toFixed(2)} PLN
        </p>
      )}
    </div>
  );
}
