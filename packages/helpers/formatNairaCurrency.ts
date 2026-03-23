export default function formatNairaCurrency(price: number) {
  const format = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    // minimumFractionDigits: 0,
  }).format(price);

  return format;
}

// formatCurrency(total).replace("₦", "").replace(",", "");
