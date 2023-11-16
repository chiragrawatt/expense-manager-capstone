import { IUser } from "./User"

export interface IEvent {
    id: string,
    title: string,
    description: string,
    budget: number,
    startDate: string,
    endDate: string,
    isActive: boolean
    creator: IUser,
    participants: IUser[]
}