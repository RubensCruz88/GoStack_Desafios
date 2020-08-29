import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulator, currentValue) => {
      const totalValue =
        currentValue.type === 'income'
          ? acumulator + currentValue.value
          : acumulator;
      return totalValue;
    }, 0);

    const outcome = this.transactions.reduce((acumulator, currentValue) => {
      const totalValue =
        currentValue.type === 'outcome'
          ? acumulator + currentValue.value
          : acumulator;
      return totalValue;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
