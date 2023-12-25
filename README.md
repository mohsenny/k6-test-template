# 🧪 Load Testing Framework

## Installation

Before running the tests locally, ensure you have `k6` installed and set the necessary environmental variables. Also, install the required NPM modules.

### Windows Setup

1. Set your values for the environmental variables in [local.ps1](./scripts/setup/local.ps1).
2. Source the PowerShell script to set up the environment and dependencies:

   ```powershell
   . .\scripts\setup\local.ps1
   ```

### Unix-based OS Setup

1. Set your values for the environmental variables in [local.sh](./scripts/setup/local.sh).
2. Make the script executable and source it:

   ```bash
   chmod +x ./scripts/setup/local.sh && source ./scripts/setup/local.sh
   ```

## Running the Tests

Execute the tests based on your environment:

- **Local Machine**:
  ```bash
  npm run test:local path/to/test
  ```
- **k6 Cloud Dashboard**:
  ```bash
  npm run test:cloud path/to/test
  ```
- **CI Environment**:
  ```bash
  npm run test:ci path/to/test
  ```

## Developing a New Test

### Step 1: Set the Load

Define the load for the tests in [`load.js`](./scenarios/load.js), using the filename as the key.

For load scenario options, refer to the [k6 options documentation](https://k6.io/docs/using-k6/k6-options/reference/#scenarios).

### Step 2: Define Test Endpoints

Specify the endpoints to test in [endpoints.js](./helpers/config/endpoints.js).

### Step 3: Define Request Functions

Create request functions (e.g., `POST`, `GET`) for your endpoints under [requests/](./helpers/requests/).

### Step 4: Mandatory Environmental Variables

See [configure.js](./helpers/config/configure.js) for mandatory environmental variables needed for test execution.

### Step 5: Test Example

Here's a template for a typical load test:

```js
import { sleep, group } from 'k6';

// Request Helpers
import * as accountsRequests from '../helpers/requests/accounts.js';
import * as contactsRequests from '../helpers/requests/contacts.js';

// Configuration
import { configuration } from '../helpers/config/index.js';
const load = require('../load.js').get(configuration.options.runType);

// K6 Phase Options
export const options = {
  thresholds: {
    http_req_failed: ['rate < 0.01'] /* http errors should be less than 1% */,
    http_req_duration: ['p(95) < 500'] /* 95% of requests should be below 500ms */,
  },
  scenarios: {
    conversations: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: load.testAbc, // This is where we get the load from what we set in Step 1
      gracefulRampDown: '30s',
    },
  },
};

// Setup
export function setup() {
  // Login as Admin to get a token
  let adminToken = accountsRequests.login(configuration.options.account.email, configuration.options.account.password);
  return { token: adminToken };
}

// Load Testcase
export default function (data) {
  group('Create a Contact', () => {
    contactsRequests.createContact(workspaceID, data.token);
  });
}
```

#### Analyzing the Report

The test output will include various metrics:

![Test output](https://github.com/mohsenny/taf-consumer/assets/1129811/d773b8e0-5e18-451c-95bd-88fd92a9330d)

To help you understand each of these metrics better:

- `data_received`: The total amount of data received from the target server during the test. It's shown in kilobytes and the rate per second.

- `data_sent`: The total amount of data sent to the target server. This includes all HTTP request data sent by k6.

- `group_duration`: The average, minimum, median, maximum, 90th percentile, and 95th percentile durations of the named groups in your test script. Groups are a way to organize scenarios in k6.

- `http_req_blocked`: The time spent blocked before initiating the request. This can include time spent waiting for a free TCP connection from a connection pool if you're hitting connection limits.

- `http_req_connecting`: The time spent establishing TCP connections to the server. If this is high, it could indicate network issues or server overload.

- `http_req_duration`: The total time for the request. This includes sending time, waiting time, and receiving time. The detailed breakdown is provided for expected responses (expected_response).

- `http_req_failed`: The percentage of failed requests. Ideally, this should be 0%.

- `http_req_receiving`: The time spent receiving the response from the server after the initial request was sent.

- `http_req_sending`: The time spent sending the HTTP request to the server. This typically is a small number.

- `http_req_tls_handshaking`: Time spent performing the TLS handshake. If your request uses HTTPS, this includes the time taken to negotiate the SSL/TLS session.

- `http_req_waiting`: The time spent waiting for a response from the server (also known as Time to First Byte, TTFB). This doesn't include the time taken to download the response body.

- `http_reqs`: The total number of HTTP requests made during the entire test.

- `iteration_duration`: The time it takes to complete one full iteration of the main function in your script.

- `iterations`: The total number of times the main function was executed.

- `vus`: The number of Virtual Users (VUs) actively executing during the current test step.

- `vus_max`: The maximum number of concurrently active VUs during the test.

### Step 6: Cleanup (Optional)

For cleanup, use scripts in [cleaners](./helpers/cleaners/). These can be manually triggered or automatically in `tearDown()`.