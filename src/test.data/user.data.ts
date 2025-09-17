import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../../env.config';
import { IUserCredentials } from '../interfaces/UserModel';

export const userData: { [key: string]: IUserCredentials } = {
  test_user: {
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  },
};
