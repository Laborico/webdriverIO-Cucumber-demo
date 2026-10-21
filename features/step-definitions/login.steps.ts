import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import AppointmentPage from '../pageobjects/appointment.page.js';

/**
 * resolves a "$NAME" value from the feature file to the NAME environment
 * variable, any other value is returned as is
 */
function fromEnv (value: string) {
    const match = value.match(/^\$(\w+)$/);
    if (!match) {
        return value;
    }
    const envValue = process.env[match[1]];
    if (envValue === undefined) {
        throw new Error(`Environment variable ${match[1]} is not set, check your .env file`);
    }
    return envValue;
}

Given('I am on the login page', async () => {
    await LoginPage.open()
});

When('I log in with username {string} and password {string}', async (username: string, password: string) => {
    await LoginPage.login(fromEnv(username), fromEnv(password))
});

Then('I should see the appointment form', async () => {
    await expect(AppointmentPage.appointmentForm).toBeDisplayed();
});

Then('I should see a login failed message', async () => {
    await expect(LoginPage.loginFailedMessage).toBeDisplayed();
    await expect(LoginPage.loginFailedMessage).toHaveText(expect.stringContaining('Login failed!'));
});
