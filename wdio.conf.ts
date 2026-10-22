import 'dotenv/config'

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: [
        './features/**/*.feature'
    ],

    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],

    logLevel: 'warn',
    baseUrl: process.env.BASE_URL,
    waitforTimeout: 10000,

    framework: 'cucumber',
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts']
    },

    afterScenario: async function () {
        // scenarios in a feature share one browser session, so clear the
        // login cookie to start each scenario logged out
        await browser.deleteCookies()
    }
}
