import { When, Then, DataTable } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals'

import AppointmentPage from '../pageobjects/appointment.page.js';
import ConfirmationPage from '../pageobjects/confirmation.page.js';
import { resolveDates } from '../support/dates.js';

When('I book an appointment with:', async (table: DataTable) => {
    await AppointmentPage.book(resolveDates(table.rowsHash()))
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

Then('the confirmation should show:', async (table: DataTable) => {
    expect(await ConfirmationPage.getAppointment()).toEqual(resolveDates(table.rowsHash()));
});
