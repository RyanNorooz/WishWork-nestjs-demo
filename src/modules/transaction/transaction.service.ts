import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { TransactionRepository } from '../../repositories/Transaction.repository';
import { Transaction } from 'src/entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async createTransaction(
    type: string,
    amount: number,
    fee: number,
    total: number,
  ): Promise<Transaction> {
    return await this.transactionRepository.createTransaction({
      orderID: uuidv4(),
      type,
      amount,
      fee,
      total,
      registerDate: Date.now(),
      finalDate: Date.now(),
    });
  }

  async getTransactions() {
    return await this.transactionRepository.getTransactions();
  }
}
