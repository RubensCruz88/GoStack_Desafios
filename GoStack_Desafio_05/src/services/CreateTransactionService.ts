// import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // Validamos para verificar se pode sacar
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionRepository.getBalance();

    if (type !== 'outcome' && type !== 'income') {
      throw Error('Invalid type');
    } else if (typeof value !== 'number') {
      throw Error('Invalid value');
    } else if (type === 'outcome' && total < value) {
      throw Error('Value not availiable ');
    }

    const categoriesRepository = getRepository(Category);

    const categoryReference = await categoriesRepository.findOne({
      where: { title: category },
    });

    let category_id;

    if (!categoryReference) {
      const newCategory = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(newCategory);

      category_id = newCategory.id;
    } else {
      category_id = categoryReference.id;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
