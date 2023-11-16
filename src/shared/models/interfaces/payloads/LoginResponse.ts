import { IUser } from "../User";

export interface ILoginResponse {
    token: string,
    user: IUser
}