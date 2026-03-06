emailjs.init("Pallavi U S"); // from emailjs dashboard

const services = [
  { name: "Dry Cleaning", price: 150 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 50 },
  { name: "Steam Removal", price: 120 },
  { name: "Leather & Suede", price: 200 },
];

let cart = [];

const serviceList = document.getElementById("serviceList");
const cartList = document.getElementById("cartList");
const totalAmount = document.getElementById("totalAmount");

services.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `${s.name} - ₹${s.price} <button onclick="addToCart(${i})">Add</button>`;
  serviceList.appendChild(li);
});

function addToCart(index) {
  cart.push(services[index]);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${i})">Remove</button>`;
    cartList.appendChild(li);
  });
  totalAmount.innerText = cart.reduce((sum, item) => sum + item.price, 0);
}

function sendBooking() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = cart.map(i => i.name).join(", ") + ` | Total: ₹${totalAmount.innerText}`;

  const templateParams = {
    name,
    email,
    phone,
    message
  };

  emailjs.send('service_69twuu4', 'template_1ybtoav', templateParams)
    .then(() => {
      document.getElementById("confirmationMsg").innerText =
        "Thank you for booking! We will get back to you soon.";
    });
}

function scrollToBooking() {
  document.getElementById("services").scrollIntoView({ behavior: 'smooth' });
}
