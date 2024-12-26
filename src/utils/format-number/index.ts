export const formatNumber = (amount: number) => {
  let formattedAmount = amount.toFixed(2); 

  if (formattedAmount.endsWith(".00")) {
    formattedAmount = formattedAmount.slice(0, -3); // Remove ".00"
  }

  formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedAmount}`;
};
