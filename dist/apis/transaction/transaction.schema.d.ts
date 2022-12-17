import mongoose, { Document } from 'mongoose';
export declare type TransactionDocument = Transaction & Document;
export declare class Transaction {
    userId: string;
    from: string;
    to: string;
    method: string;
    hash: string;
}
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, any>, {}, {}, {}, {}, "type", Transaction>;
