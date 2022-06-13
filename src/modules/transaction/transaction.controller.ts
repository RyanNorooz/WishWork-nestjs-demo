import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { Transaction } from 'src/entities/transaction.entity';
// import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { UpdateTransactionDto } from './dto/updateTransaction.dto';
import { TransactionService } from './transaction.service';

@Controller('Transaction')
export class TransactionController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private transactionService: TransactionService,
  ) {}

  @Post('/createTransaction')
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(
      createTransactionDto.type,
      createTransactionDto.amount,
      createTransactionDto.fee,
      createTransactionDto.total,
    );
  }

  @Get('/getTransactions')
  async getAllTransactions(@Res() res: any) {
    const storages: any = await this.transactionService.getTransactions();
    return res.status(HttpStatus.OK).send(storages);
  }
}
