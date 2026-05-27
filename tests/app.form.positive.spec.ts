import { test, expect } from "../utils/fixtures/appFixture";
import { User, PictureType } from "../types/user";
import {
    generateUserData,
    generateUserDataRequired,
    getAvatar
} from "../utils/data/user.data.factory";

test.describe("Application form | Positive tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.appForm.navigate();
    });

    const name = (user: User) => `${user.FirstName} ${user.LastName}`;

    test("Successful form submission | Required fields", async ({ app }) => {
        const user: User = generateUserDataRequired();

        await app.appForm.submitApplicationForm(user, {
            optionalFields: false,
            resolveCaptcha: true
        });
        await app.formSubmitResult.checkUserPassedSubmission();

        await expect(app.page).toHaveTitle(app.formSubmitResult.pageTitle);
        await expect(await app.formSubmitResult.getName()).toBe(name(user));
        await expect(await app.formSubmitResult.getEmail()).toBe(user.Email);
        await expect(await app.formSubmitResult.getAvatarText()).toBe(
            "No Avatar Uploaded"
        );
    });

    test("Successful form submission | Optional fields", async ({ app }) => {
        const user: User = generateUserData();

        await app.appForm.submitApplicationForm(user);
        await app.formSubmitResult.checkUserPassedSubmission();

        await expect(app.page).toHaveTitle(app.formSubmitResult.pageTitle);
        await expect(await app.formSubmitResult.getName()).toBe(name(user));
        await expect(await app.formSubmitResult.getEmail()).toBe(user.Email);
    });

    const testData = [
        PictureType.bmp,
        PictureType.gif,
        PictureType.jpeg,
        PictureType.jpg,
        PictureType.png
    ];

    for (const picture of testData) {
        test(`Successful form submission | Avatar is ${PictureType[picture]}`, async ({
            app
        }) => {
            const user: User = generateUserDataRequired();
            user.Avatar = { UploadFrom: getAvatar({ picture }) };

            await app.appForm.submitApplicationForm(user);

            await expect(app.page).toHaveTitle(app.formSubmitResult.pageTitle);
            await expect(
                await app.formSubmitResult.getAvatar()
            ).toHaveScreenshot(user.Avatar.UploadFrom);
        });
    }
});
