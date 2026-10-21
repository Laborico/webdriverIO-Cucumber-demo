import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#txt-username');
    }

    public get inputPassword () {
        return $('#txt-password');
    }

    public get btnLogin () {
        return $('#btn-login');
    }

    public get loginFailedMessage () {
        return $('#login .text-danger');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('/profile.php#login');
    }
}

export default new LoginPage();
