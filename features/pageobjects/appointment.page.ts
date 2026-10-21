import { $ } from '@wdio/globals'
import Page from './page.js';

export interface Appointment {
    facility: string;
    program: string;
    date: string;
    comment: string;
}

class AppointmentPage extends Page {

    public get appointmentForm () {
        return $('#appointment form');
    }

    public get selectFacility () {
        return $('#combo_facility');
    }

    public radioProgram (program: string) {
        return $(`input[name="programs"][value="${program}"]`);
    }

    public get inputVisitDate () {
        return $('#txt_visit_date');
    }

    public get inputComment () {
        return $('#txt_comment');
    }

    public get btnBookAppointment () {
        return $('#btn-book-appointment');
    }

    public async book (appointment: Appointment) {
        await this.selectFacility.selectByVisibleText(appointment.facility);
        await this.radioProgram(appointment.program).click();
        await this.inputVisitDate.setValue(appointment.date);
        await this.inputComment.setValue(appointment.comment);
        await this.btnBookAppointment.click();
    }
}

export default new AppointmentPage();
