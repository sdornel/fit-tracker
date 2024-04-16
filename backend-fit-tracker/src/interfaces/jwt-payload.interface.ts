export interface JwtPayload {
    username: string;
    sub: number;  // 'sub' is a standard claim meaning "subject" of the JWT
}