import * as dotenv from 'dotenv';

dotenv.config({ override: true });
function requireEnvVariable(envVariableName: string): string {
  const envVariableValue = process.env[envVariableName];
  if (envVariableValue === undefined) {
    throw new Error(`Environment variable ${envVariableName} is not set.`);
  }
  return envVariableValue;
}

export const BASE_URL = requireEnvVariable('BASE_URL');
export const TEST_USER_EMAIL = requireEnvVariable('TEST_USER_EMAIL');
export const TEST_USER_PASSWORD = requireEnvVariable('TEST_USER_PASSWORD');
export const NONEXISTINGACCOUNT_EMAIL = requireEnvVariable(
  'NONEXISTINGACCOUNT_EMAIL',
);
export const NONEXISTINGACCOUNT_PASSWORD = requireEnvVariable(
  'NONEXISTINGACCOUNT_PASSWORD',
);
