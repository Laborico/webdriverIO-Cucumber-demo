# webdriverio-cucumber-demo

End-to-end UI tests for the [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com/) demo site, written with WebdriverIO, Cucumber and TypeScript, using the Page Object pattern.

## Quick start

```bash
npm install
cp .env.sample .env
npm test
```

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 22.19 or later | Required by WebdriverIO 10 |
| Google Chrome | any recent version | WebdriverIO downloads the matching ChromeDriver automatically |
| Java | 8 or later | Only needed to view the Allure report |

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your `.env` file from the sample:

   ```bash
   cp .env.sample .env
   ```

   | Variable | Purpose |
   |---|---|
   | `BASE_URL` | Site under test, used as WebdriverIO's `baseUrl` |
   | `CURA_USERNAME` | Valid login username |
   | `CURA_PASSWORD` | Valid login password |

   The sample already contains the public demo credentials shown on the CURA login page. `.env` is git-ignored.

## Running the tests

| Command | Runs |
|---|---|
| `npm test` | Every scenario |
| `npm test -- --spec features/login.feature` | One feature file |
| `npm test -- --cucumberOpts.tags='@smoke'` | Only the happy paths |
| `npm test -- --cucumberOpts.tags='@appointment'` | One feature by tag |
| `npm test -- --cucumberOpts.tags='not @history'` | Everything except one feature |

Results are printed to the console by the spec reporter.

### Allure report

Every run also writes Allure results to `allure-results/`. When a step fails, a screenshot of the browser at that moment is attached to the step. To view the report (requires Java):

```bash
npx -p allure-commandline allure serve allure-results
```

## Automated scenarios

### Login ([features/login.feature](features/login.feature)) `@login`

| Scenario | Expected result | Tags |
|---|---|---|
| Login with valid credentials | Appointment form is shown | `@smoke` |
| Login with an invalid password | "Login failed!" message | |
| Login with an unknown user | "Login failed!" message | |

Login is the gate to every other feature of the site, so it is the first thing that must work. The two negative cases cover the two different ways credentials can be wrong and confirm the site rejects both rather than letting a partial match through.

### Book an appointment ([features/appointment.feature](features/appointment.feature)) `@appointment`

| Scenario | Expected result | Tags |
|---|---|---|
| Book an appointment with Medicaid | Confirmation shows all five booked fields | `@smoke` |
| Book an appointment with Medicare | Confirmation shows all five booked fields | `@smoke` |
| Book an appointment with None | Confirmation shows all five booked fields | `@smoke` |
| Book an appointment without a visit date | Not submitted, date field flagged as missing, date picker opens | |

Booking an appointment is the main business flow of the site. The outline runs once per healthcare program, so every option of the program radio group is tested. The visit date is the only required field on the form, so submitting without it is the meaningful negative case. CURA doesn't show an error message for it; the browser's own `required` validation blocks the submit and focuses the field, which opens the date picker, so the test asserts on exactly that.

### Appointment history ([features/history.feature](features/history.feature)) `@history`

| Scenario | Expected result | Tags |
|---|---|---|
| Booked appointment at Tokyo CURA Healthcare Center appears in the history | History contains an entry matching all five fields | |
| History is empty before any appointment is booked | "No appointment." is shown, with no entries | |

The confirmation page only proves the booking was accepted, while the history proves it was saved.

### Not automated

Logging out, the "Make Appointment" button on the home page, and the profile page were left out to keep the suite focused on the flows that carry business logic: logging in, booking, and seeing what was booked. They would be the next candidates to add.

## How it works

### Framework structure

```
.
├── features/
│   ├── login.feature              # Gherkin scenarios, one file per feature
│   ├── appointment.feature
│   ├── history.feature
│   ├── pageobjects/               # Selectors and page interactions
│   │   ├── page.ts                #   base class, open(path) relative to baseUrl
│   │   ├── login.page.ts
│   │   ├── appointment.page.ts    #   also defines the shared Appointment type
│   │   ├── confirmation.page.ts
│   │   └── history.page.ts
│   ├── step-definitions/          # Gherkin steps mapped to page object calls
│   │   ├── common.steps.ts        #   "Given I am logged in", shared by features
│   │   ├── login.steps.ts
│   │   ├── appointment.steps.ts
│   │   └── history.steps.ts
│   └── support/
│       └── dates.ts               # "today + N days" helper
├── wdio.conf.ts                   # WebdriverIO configuration and hooks
├── .env.sample                    # Template for the required environment variables
└── tsconfig.json
```

### Implementation details

**Page objects.** Each page extends `Page`, whose `open(path)` navigates relative to `BASE_URL`. Selectors are getters, so elements are looked up fresh each time they're used. Fields on the confirmation and history pages are scoped to their own section or panel, because CURA reuses the same ids (`#facility`, `#program`, …) on both pages and in every history entry.

**Scenario Outlines.** Test data is set once, in each outline's `Examples` table, and the steps refer to it through `<placeholders>`. Adding a case is reduced to only adding a row.

**Credentials from `.env`.** `dotenv` loads `.env` when WebdriverIO starts. Feature files refer to secrets by name (`$CURA_USERNAME`), and the login step swaps them for the real values, so credentials never appear in feature files or reports.

**Isolated scenarios.** WebdriverIO reuses one browser session for every scenario in a feature file. An `afterScenario` hook clears cookies, so each scenario starts logged out and with an empty appointment history, regardless of what ran before it.

**Failure screenshots.** An `afterStep` hook takes a screenshot whenever a step fails and attaches it to that step in the Allure report.

**Tags.** Every feature has a tag of its own (`@login`, `@appointment`, `@history`), and the happy paths are tagged `@smoke` for a quick confidence run. 

### Dependencies

| Package | Purpose |
|---|---|
| `@wdio/cli`, `@wdio/local-runner` | WebdriverIO test runner |
| `@wdio/globals`, `expect-webdriverio` | `browser`, `$`, `$$` and the `expect` assertions |
| `@wdio/cucumber-framework` | Runs Gherkin feature files with Cucumber |
| `@wdio/spec-reporter` | Console output |
| `@wdio/allure-reporter` | Allure results and screenshot attachments |
| `dotenv` | Loads `.env` into `process.env` |
| `@types/node` | Node.js type definitions for TypeScript |

TypeScript is compiled on the fly by WebdriverIO, so there is no build step.
