// Assignment 2: Operators, Expressions, and Input Handling
// Run this file in a browser environment using assignment2.html.
const billAmount = Number(prompt("Enter the bill amount:"));
const tipPercentage = Number(prompt("Enter the tip percentage:"));

if (!Number.isFinite(billAmount) || billAmount < 0 ||
    !Number.isFinite(tipPercentage) || tipPercentage < 0) {
  console.log("Please enter valid non-negative numbers.");
} else {
  const tip = billAmount * tipPercentage / 100;
  const total = billAmount + tip;
  console.log(`Subtotal: $${billAmount.toFixed(2)}`);
  console.log(`Tip Percentage: ${tipPercentage}%`);
  console.log(`Calculated Tip: $${tip.toFixed(2)}`);
  console.log(`Total Amount to Pay: $${total.toFixed(2)}`);
}
