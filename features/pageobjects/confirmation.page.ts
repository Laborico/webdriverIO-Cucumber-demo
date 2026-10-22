import { $ } from '@wdio/globals'
import Page from './page.js';
import { Appointment } from './appointment.page.js';

class ConfirmationPage extends Page {

    public get summary () {
        return $('#summary');
    }

    public get facility () {
        return $('#summary #facility');
    }

    public get readmission () {
        return $('#summary #hospital_readmission');
    }

    public get program () {
        return $('#summary #program');
    }

    public get visitDate () {
        return $('#summary #visit_date');
    }

    public get comment () {
        return $('#summary #comment');
    }

    public async getAppointment (): Promise<Appointment> {
        return {
            facility: await this.facility.getText(),
            readmission: await this.readmission.getText(),
            program: await this.program.getText(),
            date: await this.visitDate.getText(),
            comment: await this.comment.getText(),
        };
    }
}

export default new ConfirmationPage();
