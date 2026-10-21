import { Given } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import AppointmentPage from '../pageobjects/appointment.page.js';

Given('I am logged in', async () => {
    const username = process.env.CURA_USERNAME;
    const password = process.env.CURA_PASSWORD;
    if (!username || !password) {
        throw new Error('CURA_USERNAME and CURA_PASSWORD must be set, check your .env file');
    }

    await LoginPage.open()
    await LoginPage.login(username, password)
    await expect(AppointmentPage.appointmentForm).toBeDisplayed();
});
