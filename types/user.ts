export interface User {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PasswordConfirm: string;
    Avatar: Avatar;
}

interface Avatar {
    UploadFrom: string;
    File?: File;
}

export enum Gender {
    Male,
    Female,
    Other,
}

export enum PictureType {
    png,
    jpg,
    jpeg,
    tif,
    bmp,
}
