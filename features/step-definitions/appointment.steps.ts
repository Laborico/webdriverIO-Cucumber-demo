import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import AppointmentPage from '../pageobjects/appointment.page.js';
import ConfirmationPage from '../pageobjects/confirmation.page.js';

When('I book an appointment with:', async (table: DataTable) => {
    const { facility, program, date, comment } = table.rowsHash();
    await AppointmentPage.book({ facility, program, date, comment })
});

Then('I should see the appointment confirmation', async () => {
    await expect(ConfirmationPage.summary).toBeDisplayed();
});

Then('the confirmation should show the facility {string}', async (facility: string) => {
    await expect(ConfirmationPage.facility).toHaveText(facility);
});

Then('the confirmation should show the program {string}', async (program: string) => {
    await expect(ConfirmationPage.program).toHaveText(program);
});

Then('the confirmation should show the date {string}', async (date: string) => {
    await expect(ConfirmationPage.visitDate).toHaveText(date);
});
