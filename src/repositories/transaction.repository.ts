import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../modules/transaction/dto/createTransaction.dto';
import { UpdateTransactionDto } from '../modules/transaction/dto/updateTransaction.dto';

export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }

  async getTransactions() {
    let transactions: Transaction[];

    try {
      transactions = await this.transactionModel
        .find()
        .sort({ createdAt: -1 })
        .exec();

      return {
        ok: true,
        data: transactions,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
