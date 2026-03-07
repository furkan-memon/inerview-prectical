let data = [];
let edit = null;

const dateInput = document.querySelector("#date");
const descInput = document.querySelector("#desc");
const amountInput = document.querySelector("#amount");

const table = document.querySelector("#table");
const total = document.querySelector("#total");
const sort = document.querySelector("#sort");

const addBtn = document.querySelector("#addBtn");
const resetBtn = document.querySelector("#resetBtn");
const exportBtn = document.querySelector("#exportBtn");

addBtn.addEventListener("click", add);
resetBtn.addEventListener("click", reset);
exportBtn.addEventListener("click", exportCSV);
sort.addEventListener("change", sortData);

function add() {
  let date = dateInput.value;
  let desc = descInput.value;
  let amount = Number(amountInput.value);

  if (!date || !desc || amount <= 0) {
    alert("Enter valid data");
    return;
  }

  let item = { date, desc, amount };

  if (edit === null) {
    data.push(item);
  } else {
    data[edit] = item;
    edit = null;
  }

  save();
  render();
  clear();
}

function render() {
  table.innerHTML = "";

  data.forEach((item, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
<td class="border p-2">${item.date}</td>
<td class="border p-2">${item.desc}</td>
<td class="border p-2">₹${item.amount}</td>
<td class="border p-2">
<button class="edit text-blue-600">Edit</button>
<button class="del text-red-600">Delete</button>
</td>
`;

    row.querySelector(".edit").addEventListener("click", () => editItem(i));

    row.querySelector(".del").addEventListener("click", () => remove(i));

    table.appendChild(row);
  });

  calcTotal();
}

function calcTotal() {
  let sum = 0;

  data.forEach((i) => {
    sum += i.amount;
  });

  total.innerText = sum.toFixed(2);
}

function remove(i) {
  data.splice(i, 1);

  save();
  render();
}

function editItem(i) {
  dateInput.value = data[i].date;
  descInput.value = data[i].desc;
  amountInput.value = data[i].amount;

  edit = i;
}

function clear() {
  dateInput.value = "";
  descInput.value = "";
  amountInput.value = "";
}

function reset() {
  data = [];
  save();
  render();
}

function sortData() {
  if (sort.value === "date") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sort.value === "amount") {
    data.sort((a, b) => a.amount - b.amount);
  }

  render();
}

function exportCSV() {
  let csv = "Date,Description,Amount\n";

  data.forEach((i) => {
    csv += `${i.date},${i.desc},${i.amount}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();
}

function save() {
  localStorage.setItem("expenses", JSON.stringify(data));
}

function load() {
  let saved = localStorage.getItem("expenses");

  if (saved) {
    data = JSON.parse(saved);
    render();
  }
}

load();