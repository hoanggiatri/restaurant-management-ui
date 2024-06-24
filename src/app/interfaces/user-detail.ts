export interface UserDetail {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    phoneNumber: string;
    twoFactorEnabled: true;
    phoneNumberConfirmed: true;
    accessFailedCount: 0;
}

export interface AddUserDTO {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface UpdateUserDTO {
    fullName: string;
    phoneNumber: string;
}