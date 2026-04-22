const products = [
  {
    name: "Class",
    price: 500,
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=200"
  },
  {
    name: "Lipstick",
    price: 800,
    img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200"
  },
  {
    name: "Bangles",
    price: 600,
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a7b8b?w=200"
  },
  {
    name: "Shoes",
    price: 2000,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
  },
  {
    name: "Abaya",
    price: 3000,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200"
  },
  {
    name: "Scarf",
    price: 400,
    img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200"
  }
];
let manualItems = [];

// ADD MANUAL ITEM
function addManualItem() {
  let input = document.getElementById("itemInput");
  let value = input.value;

  if (value === "") return;

  manualItems.push(value);
  input.value = "";

  renderManualList();
}

// RENDER LIST
function renderManualList() {
  let list = document.getElementById("manualList");
  list.innerHTML = "";

  manualItems.forEach((item, index) => {
    list.innerHTML += `
      <li>
        ${item}
        <button onclick="deleteManualItem(${index})">Delete</button>
      </li>
    `;
  });

  document.getElementById("manualCount").innerText = manualItems.length;
}

// DELETE ITEM
function deleteManualItem(index) {
  manualItems.splice(index, 1);
  renderManualList();
}
let cart = [];

// SHOW PRODUCTS
function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, index) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>Rs ${p.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(index) {
  let item = cart.find(i => i.name === products[index].name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...products[index], qty: 1 });
  }

  renderCart();
}

// RENDER CART
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.qty})</span>
        <div>
          <button onclick="changeQty(${index}, -1)">-</button>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

// CHANGE QUANTITY
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// INIT
renderProducts();