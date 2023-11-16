import { IExpenseCategory } from "./ExpenseCategory";
import { EExpenseStatus } from "./ExpenseStatus";
import { IUser } from "./User";

export interface IExpense { 
    id: string,
    amount: number, 
    category: IExpenseCategory, 
    date: string, 
    receipt: string, 
    desciption: string,
    event:string, 
    status: EExpenseStatus,
    creator: IUser,
    rejectionMessage: string
}