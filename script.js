let transactionsDetails = []
let balanceDetails = {totalBalance:0,totalIncome:0,totalExpense:0}
const setTodayDate =()=>{
    let date = (new Date().toISOString()).slice(0,10);
    document.getElementById('customDate').value = date;
    let data = localStorage.getItem("transactions");
    if(data == null){
        localStorage.setItem("transactions",transactionsDetails);
        localStorage.setItem("balanceDetails", JSON.stringify(balanceDetails));
    }else{
        transactionsDetails = JSON.parse(localStorage.getItem("transactions"));
        balanceDetails = JSON.parse(localStorage.getItem("balanceDetails"));
        document.getElementById('total').innerHTML = balanceDetails.totalBalance;
        document.getElementById('income').innerHTML = balanceDetails.totalIncome
        document.getElementById('expense').innerHTML = balanceDetails.totalExpense;
    }
    transactionsList()
}

const getValue = (type) => {
    let val = parseInt(document.getElementById('customAmount').value);
    let title = document.getElementById('customTitle').value;
    let cdate = document.getElementById('customDate').value;
    let nDate = cdate.split("-").reverse().join("/")

    if ( isNaN(val) || val == 0) {
        alert('Please enter a valid amount')
    }
    else if(title == ""){
        alert('Please enter title')
    }
     else {
        if (type == 'add') {
            let income =  balanceDetails.totalIncome + val;
            let balance = balanceDetails.totalBalance + val;
            balanceDetails.totalBalance = balance;
            balanceDetails.totalIncome = income;
        } else {
            let expense = balanceDetails.totalExpense + val
            let balance = balanceDetails.totalBalance - val;
            balanceDetails.totalBalance = balance;
            balanceDetails.totalExpense = expense;
        }
        transactionsDetails.unshift({title,type:type,amount:val,date:nDate})
        localStorage.setItem('transactions',JSON.stringify(transactionsDetails))
        localStorage.setItem('balanceDetails',JSON.stringify(balanceDetails))
        transactionsList()
        clearValue()
    }
}

const transactionsList = () => {
    let data = ''
    transactionsDetails.map((item, i) => {
        data += `
            <div id="transactions">
                <div class="transactions-details">
                    <p class="title">${item.title}</p>
                    <p class="date">${item.date}</p>
                </div>
                <div class="delete-history">
                    <h6 class="amount ${item.type == 'add' ?'transactions-green':'transactions-red'}"> ${item.type == 'add' ?'+':'-'} ${item.amount}</h6>
                    <button onclick="deleteHistory(${i})" class='delete-btn btn'> <i class="fa fa-light fa-trash"></i></button>
                </div>
            </div>
    `})
    document.getElementById('table').innerHTML = data
}
const deleteHistory=(index)=>{
    let gg = transactionsDetails;
    let newData = []
    let deleteData = []
    transactionsDetails?.filter((item,i)=> i !=index ? newData.push(item) : deleteData.push(item) );
    if(deleteData?.length){
        if(deleteData[0].type== 'add'){
            balanceDetails.totalIncome -= deleteData[0].amount;
            balanceDetails.totalBalance -= deleteData[0].amount;
        }else{
            balanceDetails.totalExpense -= deleteData[0].amount;
            balanceDetails.totalBalance += deleteData[0].amount;
        }
    }
    localStorage.setItem('transactions',JSON.stringify(newData))
    localStorage.setItem('balanceDetails',JSON.stringify(balanceDetails))
    setTodayDate()
}

const clearValue = () => {
    document.getElementById('customAmount').value = "";
    document.getElementById('customTitle').value = "";
    setTodayDate()
}
setTodayDate()