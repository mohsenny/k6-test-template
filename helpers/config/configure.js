function getEnvVariable(varName) {
  const envSource = typeof __ENV !== "undefined" ? __ENV : process.env;
  if (typeof envSource[varName] === "undefined") {
    throw new Error(
      "When running the tests locally you need to set the necessary Environmental Variables. Please check the README for more info.",
    );
  }
  return envSource[varName];
}

const host = getEnvVariable("MY_HOSTNAME");
const runType = getEnvVariable("RUN_TYPE");
// Here you can enforce more mandatory Environmental Variable to be set, i.e.:
// const email = getEnvVariable('ENVIRONMENT');
// const email = getEnvVariable('TESTING_EMAIL');
// const password = getEnvVariable('TESTING_PASSWORD');

export const options = {
  projectId: 1,
  host,
  runType,
  account: {
    email: "sample",
    password: "sample",
    // Pass other global values to be used by all tests
    // userId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
};
