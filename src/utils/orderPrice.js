import calculateDiscountPrice from "./calculateProductDiscountPrice";

function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      const { price, discount, quantity } = item;
      const effectivePrice = discount
        ? calculateDiscountPrice(price, discount)
        : price;
  
      totalPrice += effectivePrice * quantity;
    });
  
    return totalPrice.toFixed(2); // Round to 2 decimal places
  }

export { calculateTotalPrice };
