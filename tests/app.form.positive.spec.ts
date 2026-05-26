import { test, expect } from "../utils/fixtures/appFixture";
import { User } from "../types/user";
import { generateUserData } from "../utils/data/user.data.factory";

test.describe("Application form | Positive tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.appForm.navigate();
    });

    // Form submission with valid data:
    // 1) verify that the submission is successful
    // 2) the data is correctly displayed on the success page
    test("Successful form submission", async ({ app }) => {
        const user: User = generateUserData();

        await app.appForm.submitApplicationForm(user);
        await app.appForm.checkSuccessfulSubmit();

        await expect(app.page).toHaveTitle(app.formSubmitResult.pageTitle);
        // other asserts to check form was submitted successfully
    });
});
