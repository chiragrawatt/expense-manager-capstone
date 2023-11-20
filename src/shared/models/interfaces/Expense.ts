import { IEvent } from "./Event";
import { IExpenseCategory } from "./ExpenseCategory";
import { EExpenseStatus } from "../enums/ExpenseStatus";
import { IUser } from "./User";

export interface IExpense { 
    id: string,
    amount: number, 
    category: IExpenseCategory, 
    date: string, 
    receipt: string, 
    description: string,
    event: IEvent, 
    status: EExpenseStatus,
    creator: IUser,
    rejectionMessage: string
}