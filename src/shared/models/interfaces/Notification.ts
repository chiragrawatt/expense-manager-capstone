import { ENotificationType } from "../enums/NotificationType";

export interface INotification {
    navLink: string,
    type: ENotificationType,
    message: string,
    isVisited: Boolean
}