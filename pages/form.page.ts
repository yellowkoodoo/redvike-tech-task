import { Locator } from "@playwright/test";
import BasePage from "./base/base.page";
import { User } from "../types/user";

enum AppFormElements {
    FirstName = "first_name",
    LastName = "last_name",
    Email = "email",
    Password = "password",
    PasswordConfirm = "confirm_password",
    Avatar = "avatar",
    Submit = "submit",
}

export default class AppFormPage extends BasePage {
    private readonly slider = this.page.locator("#slider-thumb");
    private readonly sliderTrack = this.page.locator("#slider-track");
    private readonly submitButton = this.page.locator('input[type="submit"]');
    private readonly getInputElement = (
        formElement: AppFormElements,
    ): Locator => this.page.locator(`input[name='${formElement}']`);

    async submitApplicationForm(user: User) {
        await this.enterFirstName(user.FirstName);
        await this.enterLastName(user.LastName);
        await this.enterEmail(user.Email);
        await this.enterPassword(user.Password);
        await this.confirmPassword(user.PasswordConfirm);
        await this.uploadAvatar(user.Avatar.UploadFrom);
        await this.resolveCaptcha();
        await this.clickSubmit();
    }

    async enterFirstName(firstName: string) {
        await this.getInputElement(AppFormElements.FirstName).fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.getInputElement(AppFormElements.LastName).fill(lastName);
    }

    async enterEmail(email: string) {
        await this.getInputElement(AppFormElements.Email).fill(email);
    }

    async enterPassword(password: string) {
        await this.getInputElement(AppFormElements.Password).fill(password);
    }

    async confirmPassword(password: string) {
        await this.getInputElement(AppFormElements.PasswordConfirm).fill(
            password,
        );
    }

    async uploadAvatar(filePath: string) {
        await this.getInputElement(AppFormElements.Avatar).setInputFiles(
            filePath,
        );
    }

    async resolveCaptcha() {
        const trackBox = await this.sliderTrack.boundingBox();

        await this.slider.dragTo(this.sliderTrack, {
            targetPosition: {
                x: trackBox!.width - 10,
                y: trackBox!.height / 2,
            },
        });
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async checkSuccessfulSubmit() {
        await this.checkSuccessfulLoad();
    }

    async getSliderText() {
        await this.slider.textContent();
    }
}
