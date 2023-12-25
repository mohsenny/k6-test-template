import { sleep, group } from "k6";

// Configuration
import { configuration } from "../../helpers/config/index.js";
import { get } from "../load.js";

// Requests
import * as postmanEcho from "../../helpers/requests/postmanEcho.js";

// Variables: global variable to use in your team or set up phase
const load = get(configuration.options.runType);

// K6 Phase Options
export const options = {
  ext: {
    loadimpact: {
      projectID: configuration.options.projectId,
      distribution: {
        "amazon:de:frankfurt": {
          loadZone: "amazon:de:frankfurt",
          percent: 100,
        },
      },
      apm: [],
    },
  },
  thresholds: {
    http_req_failed: ["rate < 0.01"] /* http errors should be less than 1% */,
    http_req_duration: [
      "p(95) < 500",
    ] /* 95% of requests should be below 500ms */,
  },
  scenarios: {
    embeddables: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: load.getPostmanEcho,
      gracefulRampDown: "30s",
    },
  },
};

export function setup() {
  // Prepare what is needed to run the tests
  // i.e: create users, get auth tokens, etc
  // At the end you can return values to be used by the test, i.e.:
  // return {
  //    token: authToken,
  // };
}

// Testcase
export default function () {
  group("Send Get to Postman Echo", () => {
    postmanEcho.getPostmanEcho();
    sleep(1);
  });
}
