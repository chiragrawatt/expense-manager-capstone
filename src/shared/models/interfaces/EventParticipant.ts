import { IUser } from "./User";

export interface IEventParticipant {
    user: IUser,
    budget: number,
    spent: number
}