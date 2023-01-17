import { User } from './user';
import { Organization } from './organization';

export class waitingRoom {
    id: number;
    id_waiting?: number;
    user?: User;
    organization?: Organization;
    username?: string;
    authority?: string;
}