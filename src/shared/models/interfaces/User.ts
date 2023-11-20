import { INotification } from "./Notification";
import { IRole } from "./Role";
import { ITeam } from "./Team";

export interface IUser {
    id: string,
    username: string,
    email: string,
    notifications: INotification
    team: ITeam,
    roles: IRole[]
}