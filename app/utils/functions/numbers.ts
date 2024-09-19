export function countDecimals(value: number) {
  return value.toString().split(".")[1]?.length || 0;
}
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
