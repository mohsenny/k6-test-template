import http from 'k6/http';
import { options } from './config/configure.js';

export const sendSlackStartedMessage = (testName) => {
  http.post(
    'https://hooks.slack.com/workflows/xxxx',
    JSON.stringify({
      host: options.host,
      testName: testName,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const sendSlackReport = (data, testName) => {
  const maxThroughput = `${data.metrics.http_reqs.values['count'].toFixed(2)} rps`;
  const avgResponseTime = `${data.metrics.http_req_duration.values['avg'].toFixed(2)} ms`;
  const ninetyFifthResponseTime = `${data.metrics.http_req_duration.values['p(95)'].toFixed(2)} ms`;
  // const vus = `${data.metrics.vus.values['value']}`;

  http.post(
    'https://hooks.slack.com/workflows/xxxx',
    JSON.stringify({
      host: options.host,
      testName: testName,
      maxThroughput: maxThroughput,
      avgResponseTime: avgResponseTime,
      ninetyFifthResponseTime: ninetyFifthResponseTime,
      // vus: vus,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
