import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ type: Number })
  orderID: number;
  @Prop({ type: String })
  type: string;
  @Prop({ type: String })
  amount: string;
  @Prop({ type: String })
  fee: string;
  @Prop({ type: String })
  total: string;
  @Prop({ type: Date, default: Date.now })
  registerDate: Date;
  @Prop({ type: Date, default: Date.now })
  finalDate: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);





