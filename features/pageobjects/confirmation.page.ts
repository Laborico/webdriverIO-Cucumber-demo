import { $ } from '@wdio/globals'
import Page from './page.js';

class ConfirmationPage extends Page {

    public get summary () {
        return $('#summary');
    }

    public get facility () {
        return $('#facility');
    }

    public get program () {
        return $('#program');
    }

    public get visitDate () {
        return $('#visit_date');
    }
}

export default new ConfirmationPage();
