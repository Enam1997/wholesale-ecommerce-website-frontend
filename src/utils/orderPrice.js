import calculateDiscountPrice from "./calculateProductDiscountPrice";

function calculateTotalProductPrice(cartItems) {
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const { price, discount, quantity } = item;
    const effectivePrice = discount
      ? calculateDiscountPrice(price, discount)
      : price;

    totalPrice += effectivePrice * quantity;
  });

  return totalPrice.toFixed(2); // Round to 2 decimal places
}

function calculateTotalOrderPrice(cartItems) {
  const productPrice = calculateTotalProductPrice(cartItems);
  const shippingPrice = 0;
  const taxes = 0;

  // Ensure the values are numbers
  const totalPrice =
    Number(productPrice) + Number(shippingPrice) + Number(taxes);

  return {
    totalProductPrice: productPrice,
    shippingPrice,
    taxes,
    totalPrice: totalPrice.toFixed(2), // Round to 2 decimal places
  };
}

export { calculateTotalProductPrice, calculateTotalOrderPrice };
