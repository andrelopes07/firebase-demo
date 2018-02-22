export interface Roles {
    standard?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
