import { $ } from '@wdio/globals'
import Page from './page.js';

export interface Appointment {
    facility?: string;
    program?: string;
    date?: string;
    comment?: string;
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

    public get datepicker () {
        return $('.datepicker-dropdown');
    }

    public get inputComment () {
        return $('#txt_comment');
    }

    public get btnBookAppointment () {
        return $('#btn-book-appointment');
    }

    public async book (appointment: Appointment) {
        if (appointment.facility !== undefined) {
            await this.selectFacility.selectByVisibleText(appointment.facility);
        }
        if (appointment.program !== undefined) {
            await this.radioProgram(appointment.program).click();
        }
        if (appointment.date !== undefined) {
            await this.inputVisitDate.setValue(appointment.date);
        }
        if (appointment.comment !== undefined) {
            await this.inputComment.setValue(appointment.comment);
        }
        await this.btnBookAppointment.click();
    }
}

export default new AppointmentPage();
