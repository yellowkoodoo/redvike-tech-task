import { test, expect } from "../utils/fixtures/appFixture";
import { User } from "../types/user";
import {
    generateUserData,
    generateUserDataRequired
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
        await expect(await app.formSubmitResult.getAvatar()).toBe(
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
});
