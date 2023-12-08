import { User } from './User';
export interface Game {
    id: number;
    gameName: string;
    createdAt: string;
    user: User;
}
