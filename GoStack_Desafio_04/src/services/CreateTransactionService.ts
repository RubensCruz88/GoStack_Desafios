import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const { total } = this.transactionsRepository.getBalance();

    if (transaction.type !== 'outcome' && transaction.type !== 'income') {
      throw Error('Invalid type');
    } else if (typeof transaction.value !== 'number') {
      throw Error('Invalid value');
    } else if (transaction.type === 'outcome' && total < transaction.value) {
      throw Error('Value not availiable ');
    }

    return transaction;
  }
}

export default CreateTransactionService;
