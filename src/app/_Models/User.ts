export interface Roles {
    standard?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    photoURL: string;
    name: string;
    email: string;
    roles: Roles;
    createdAt: number;
    lastLogin: number;
}
