function getEnvVariable(varName) {
  const envSource = typeof (__ENV) !== 'undefined' ? __ENV : process.env;
  if (typeof envSource[varName] === 'undefined') {
    throw new Error(
      'When running the tests locally you need to set the necessary Environmental Variables. Please check the README for more info.'
    );
  }
  return envSource[varName];
}

const host = getEnvVariable('MY_HOSTNAME');
const runType = getEnvVariable('RUN_TYPE');
// const email = getEnvVariable('LOAD_TESTING_EMAIL');
// const password = getEnvVariable('LOAD_TESTING_PASSWORD');

export const options = {
  projectId: 3558752,
  host,
  runType,
  account: {
    email: 'sample',
    password: 'sample',
    userId: 'f4832edd-66eb-4941-957b-c77bc6386420',
  },
};
