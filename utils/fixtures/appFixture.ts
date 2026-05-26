import { test as base, Page } from "@playwright/test";
import AppForm from "../../pages/form.page";
import FormResult from "../../pages/form.result";

type App = {
    page: Page;
    appForm: AppForm;
    formSubmitResult: FormResult;
};

export { expect } from "@playwright/test";

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            appForm: new AppForm(page),
            formSubmitResult: new FormResult(page),
        };
        await page.setViewportSize({ width: 1200, height: 1080 });
        use(app);
    },
});
