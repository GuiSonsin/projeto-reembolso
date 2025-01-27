const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")

amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

form.onsubmit = (event) =>{
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date()
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        const expenseItem = document.createElement("li")
        expense.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)
        
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const removeItem = document.createElement("img")
        removeItem.classList.add("remove-icon")
        removeItem.setAttribute("src", "img/remove.svg")
        removeItem.setAttribute("alt", "remover")

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeItem)

        expenseList.append(expenseItem)

        updateTotals()
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

function updateTotals(){
    try {
        const items = expenseList.children

        expensesQuantity.textContent = `${items.length} ${items.length == 1 ? "despesa" : "despesas"}`
    } catch (error) {
        alert("Não foi possível atualizar os totais!")
        console.log(error)
    }
}