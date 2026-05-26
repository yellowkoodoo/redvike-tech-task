import { faker } from "@faker-js/faker";
import { User, Gender, PictureType } from "../../types/user";
import { fileURLToPath } from "url";
import path from "path";

// current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateUserData(options?: { gender: Gender }) {
    if (!options) {
        options = {
            gender: faker.helpers.arrayElement([Gender.Male, Gender.Female]),
        };
    }

    const password = generatePassword();

    const user: User = {
        FirstName: generateFirstName(options.gender),
        LastName: generateLastName(options.gender),
        Email: generateEmail(),
        Password: password,
        PasswordConfirm: password,
        Avatar: { UploadFrom: getAvatar() },
    };

    return user;
}

export function generateFirstName(gender: Gender, length?: number) {
    if (gender === Gender.Other || length) {
        return faker.word.noun({ length });
    }
    return faker.person.firstName();
}

export function generateLastName(gender: Gender, length?: number) {
    if (gender === Gender.Other || length) {
        return faker.word.adverb({ length });
    }
    return faker.person.lastName();
}

export function generateEmail(options?: { user: User; provider: string }) {
    return faker.internet.email(
        options && {
            firstName: options.user.FirstName,
            lastName: options.user.LastName,
            provider: options.provider,
        },
    );
}

export function generatePassword(options?: { length: number }) {
    return faker.internet.password(
        options && {
            length: options.length,
        },
    );
}

export function getAvatar(options?: { picture: PictureType }) {
    if (!options) {
        options = {
            picture: faker.helpers.arrayElement([
                PictureType.bmp,
                PictureType.jpg,
                PictureType.png,
            ]),
        };
    }

    return path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "user",
        `avatar.${PictureType[options?.picture]}`,
    );
}
