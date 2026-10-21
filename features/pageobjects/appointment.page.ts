import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AppointmentPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get appointmentForm () {
        return $('#appointment form');
    }
}

export default new AppointmentPage();
