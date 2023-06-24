// Fetch the current balance and transactions from the backend
async function fetchBalanceAndTransactions() {
    try {
      // Fetch the balance and transactions from your backend APIs
      const balanceResponse = await fetch('/api/v1/balance');
      const transactionsResponse = await fetch('/api/v1/transactions');
  
      if (!balanceResponse.ok || !transactionsResponse.ok) {
        throw new Error('Failed to fetch balance or transactions');
      }
  
      const balance = await balanceResponse.json();
      const transactions = await transactionsResponse.json();
  
      // Update the DOM to reflect the current balance and transactions
      document.getElementById('balance-amount').textContent = `$${balance.toFixed(2)}`;
  
      const transactionItems = document.getElementById('transaction-items');
      transactionItems.innerHTML = '';
      for (const transaction of transactions) {
        const li = document.createElement('li');
        li.textContent = `${transaction.type}: $${transaction.amount} - ${transaction.description}`;
        transactionItems.appendChild(li);
      }
    } catch (error) {
      console.error('Error fetching balance or transactions:', error);
    }
  }
  
  // Handle the form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
  
    try {
      // Get the form data
      const type = document.getElementById('transaction-type').value;
      const amount = parseFloat(document.getElementById('transaction-amount').value);
      const description = document.getElementById('transaction-description').value;
        
      console.log({
        type,amount, description

      })
      // Use the form data to add a transaction via your backend API
      const response = await fetch('/api/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, amount, description }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
  
      // Fetch the updated balance and transactions
    //   fetchBalanceAndTransactions();
    
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }
  
  // Add an event listener to the form
  const form = document.getElementById('add-transaction-form');
  form.addEventListener('submit', handleFormSubmit);
  
  // Fetch the initial balance and transactions
//   fetchBalanceAndTransactions();
  