import { $, $$ } from '@wdio/globals'
import Page from './page.js';
import { Appointment } from './appointment.page.js';

class HistoryPage extends Page {

    public get noAppointmentMessage () {
        return $('#history').$('p=No appointment.');
    }

    public get appointmentPanels () {
        return $$('#history .panel');
    }

    public async getAppointments () {
        const appointments: Appointment[] = [];
        for (const panel of await this.appointmentPanels) {
            appointments.push({
                facility: await panel.$('#facility').getText(),
                readmission: await panel.$('#hospital_readmission').getText(),
                program: await panel.$('#program').getText(),
                date: await panel.$('.panel-heading').getText(),
                comment: await panel.$('#comment').getText(),
            });
        }
        return appointments;
    }

    public open () {
        return super.open('/history.php#history');
    }
}

export default new HistoryPage();
