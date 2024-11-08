export interface User {
    id?: string;
    profile: Profile;
    credentials: Credentials;
}

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    mobilePhone: string;
}

export interface Credentials {
    password: Password
}

export interface Password {
    value: string;
}