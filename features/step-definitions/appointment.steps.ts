import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals'

import AppointmentPage from '../pageobjects/appointment.page.js';
import ConfirmationPage from '../pageobjects/confirmation.page.js';

When('I book an appointment with:', async (table: DataTable) => {
    await AppointmentPage.book(table.rowsHash())
});

Then('I should see the appointment confirmation', async () => {
    await expect(ConfirmationPage.summary).toBeDisplayed();
});

Then('the appointment should not be booked', async () => {
    await expect(AppointmentPage.appointmentForm).toBeDisplayed();
    await expect(AppointmentPage.inputVisitDate).toBeFocused();
    const dateMissing = await browser.execute(
        (input) => (input as HTMLInputElement).validity.valueMissing,
        await AppointmentPage.inputVisitDate
    );
    expect(dateMissing).toBe(true);
    await expect(AppointmentPage.datepicker).toBeDisplayed();
    await expect(ConfirmationPage.summary).not.toBeExisting();
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
