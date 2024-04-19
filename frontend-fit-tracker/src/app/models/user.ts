export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    photo?: any;
    // photoBase64: string;
    dateCreated: Date;
    dateUpdated: Date;
}