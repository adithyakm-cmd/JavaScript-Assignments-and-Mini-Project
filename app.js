// Capstone: Interactive Product Inventory & Analytics Dashboard
// Uses arrays of objects, prompts/form inputs, conditions, switch, loops,
// regular/arrow functions, filter(), map(), and forEach().

"use strict";

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Mouse", price: 25 }
];
let nextId = 3;

const form = document.querySelector("#product-form");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const message = document.querySelector("#form-message");
const rows = document.querySelector("#product-rows");
const filterSelect = document.querySelector("#filter");
const countOutput = document.querySelector("#product-count");
const totalOutput = document.querySelector("#inventory-total");
const averageOutput = document.querySelector("#average-price");
const reportList = document.querySelector("#report-list");
const emptyState = document.querySelector("#empty-state");

const money = amount => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD"
}).format(amount);

function getCategory(price) {
  if (price < 50) return "Budget";
  if (price < 200) return "Standard";
  return "Premium";
}

function categoryClass(category) {
  switch (category) {
    case "Budget": return "budget";
    case "Standard": return "standard";
    case "Premium": return "premium";
    default: return "";
  }
}

function calculateTotal(items = products) {
  return items.reduce((sum, product) => sum + product.price, 0);
}

const calculateAverage = items =>
  items.length ? calculateTotal(items) / items.length : 0;

function getVisibleProducts() {
  const selected = filterSelect.value;
  let visible = products;

  if (selected === "affordable") {
    visible = products.filter(product => product.price < 200);
  } else if (selected === "budget") {
    visible = products.filter(product => getCategory(product.price) === "Budget");
  } else if (selected === "standard") {
    visible = products.filter(product => getCategory(product.price) === "Standard");
  } else if (selected === "premium") {
    visible = products.filter(product => getCategory(product.price) === "Premium");
  }

  return visible;
}

function render() {
  const visibleProducts = getVisibleProducts();
  rows.replaceChildren();
  reportList.replaceChildren();

  visibleProducts.forEach(product => {
    const category = getCategory(product.price);
    const tr = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = money(product.price);

    const categoryCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `pill ${categoryClass(category)}`;
    badge.textContent = category;
    categoryCell.appendChild(badge);

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("aria-label", `Remove ${product.name}`);
    deleteButton.addEventListener("click", () => {
      const index = products.findIndex(item => item.id === product.id);
      if (index !== -1) products.splice(index, 1);
      render();
    });
    actionCell.appendChild(deleteButton);

    tr.append(nameCell, priceCell, categoryCell, actionCell);
    rows.appendChild(tr);
  });

  const report = visibleProducts.map(product =>
    `${product.name.toUpperCase()}: ${money(product.price)}`
  );
  report.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line;
    reportList.appendChild(li);
  });

  countOutput.textContent = String(products.length);
  totalOutput.textContent = money(calculateTotal());
  averageOutput.textContent = money(calculateAverage(products));
  emptyState.style.display = visibleProducts.length ? "none" : "block";
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (!name) {
    message.textContent = "Please enter a product name.";
    nameInput.focus();
    return;
  } else if (!Number.isFinite(price) || price <= 0) {
    message.textContent = "Please enter a valid price greater than zero.";
    priceInput.focus();
    return;
  }

  // Demonstrates switch-based category evaluation.
  const category = getCategory(price);
  switch (category) {
    case "Budget":
    case "Standard":
    case "Premium":
      products.push({ id: nextId++, name, price });
      message.textContent = `${name} added as a ${category} product.`;
      break;
    default:
      message.textContent = "Unable to categorize this product.";
      return;
  }

  form.reset();
  render();
  nameInput.focus();
});

filterSelect.addEventListener("change", render);
render();
