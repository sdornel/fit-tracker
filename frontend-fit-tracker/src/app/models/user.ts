export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    photo?: any;
    photoUrl?: string;
    dateCreated: Date;
    dateUpdated: Date;
}