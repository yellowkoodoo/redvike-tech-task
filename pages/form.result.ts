import BasePage from "./base/base.page";

export default class FormResultPage extends BasePage {
    readonly pageTitle: string = "Submitted";

    async getPageTitle() {
        await this.page.title();
    }
}
