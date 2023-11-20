import { IEventParticipant } from "./EventParticipant"
import { IUser } from "./User"

export interface IEvent {
    id: string,
    title: string,
    description: string,
    totalBudget: number,
    startDate: string,
    endDate: string,
    isActive: boolean,
    isIndividual: boolean
    creator: IUser,
    participants: IEventParticipant[]
}