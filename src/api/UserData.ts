import { expect, Page, request } from '@playwright/test';
import { ILoginData, IUserCredentials } from '../interfaces/UserModel';

export async function getToken(
  loginData: IUserCredentials,
): Promise<ILoginData> {
  const requestContext = await request.newContext();
  const loginRequest = await requestContext.post(
    `${process.env.API_BASE_URL}/learning/auth/login`,
    {
      data: {
        username: loginData.email,
        password: loginData.password,
      },
    },
  );

  expect(loginRequest.ok()).toBeTruthy();

  const response = await loginRequest.json();
  await requestContext.dispose();

  return {
    token: response.access_token,
    id: response.id,
    username: response.username,
    avatar: response.avatar,
    firstName: response.firstName,
  };
}
