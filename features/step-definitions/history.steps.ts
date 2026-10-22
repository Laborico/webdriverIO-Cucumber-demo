import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import AppointmentPage from '../pageobjects/appointment.page.js';
import ConfirmationPage from '../pageobjects/confirmation.page.js';
import HistoryPage from '../pageobjects/history.page.js';

Given('I have booked an appointment with:', async (table: DataTable) => {
    await AppointmentPage.book(table.rowsHash())
    await expect(ConfirmationPage.summary).toBeDisplayed();
});

When('I open the appointment history', async () => {
    await HistoryPage.open()
});

Then('the history should contain an appointment with:', async (table: DataTable) => {
    expect(await HistoryPage.getAppointments()).toContainEqual(table.rowsHash());
});

Then('I should see that there are no appointments', async () => {
    await expect(HistoryPage.noAppointmentMessage).toBeDisplayed();
    await expect(HistoryPage.appointmentPanels).toBeElementsArrayOfSize(0);
});
