export default function calculateDiscountPrice(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice.toFixed(2); // Rounds to 2 decimal places
}
