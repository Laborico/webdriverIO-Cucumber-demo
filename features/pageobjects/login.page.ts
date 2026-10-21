import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

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

    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    public open () {
        return super.open('/profile.php#login');
    }
}

export default new LoginPage();
