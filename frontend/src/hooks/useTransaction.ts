export async function fetchTransaction(amount: number): Promise<number> {
  const response = await fetch(
    `http://localhost:4000/exchange/transaction?amount=${amount}`,
    {
      method: "POST",
    }
  );
  return response.json();
}
