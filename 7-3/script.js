
let budget = localStorage.getItem("budget") || 0
let expenses = JSON.parse(localStorage.getItem("expenses")) || []

const budgetInput = document.getElementById("budgetInput")
const addBudgetBtn = document.getElementById("addBudgetBtn")

const expenseName = document.getElementById("expenseName")
const expenseAmount = document.getElementById("expenseAmount")
const addExpenseBtn = document.getElementById("addExpenseBtn")

const expenseList = document.getElementById("expenseList")

const totalBudget = document.getElementById("totalBudget")
const totalExpenses = document.getElementById("totalExpenses")
const budgetLeft = document.getElementById("budgetLeft")

const resetBtn = document.getElementById("resetBtn")

function updateUI(){

let totalExp = expenses.reduce((sum,e)=> sum + Number(e.amount),0)

totalBudget.innerText = budget
totalExpenses.innerText = totalExp
budgetLeft.innerText = budget - totalExp

expenseList.innerHTML = ""

expenses.forEach((exp,index)=>{

expenseList.innerHTML += `
<tr class="border-b">
<td class="py-2">${exp.name}</td>
<td>${exp.amount}</td>
<td>
<button onclick="removeExpense(${index})"
class="bg-cyan-500 text-white px-2 py-1 rounded text-xs hover:bg-cyan-600">
Remove
</button>
</td>
</tr>
`

})

localStorage.setItem("budget",budget)
localStorage.setItem("expenses",JSON.stringify(expenses))

}

addBudgetBtn.onclick = () => {

budget = Number(budgetInput.value)

budgetInput.value=""

updateUI()

}

addExpenseBtn.onclick = () => {

if(expenseName.value=="" || expenseAmount.value=="") return

expenses.push({
name:expenseName.value,
amount:Number(expenseAmount.value)
})

expenseName.value=""
expenseAmount.value=""

updateUI()

}

function removeExpense(index){

expenses.splice(index,1)

updateUI()

}

resetBtn.onclick = () => {

budget = 0
expenses = []

localStorage.clear()

updateUI()

}

updateUI()
