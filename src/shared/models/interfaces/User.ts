import { IRole } from "./Role";
import { ITeam } from "./Team";

export interface IUser {
    id: string,
    username: string,
    email: string,
    team: ITeam,
    roles: IRole[]
}