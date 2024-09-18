import { authenticate } from "../../src/middlewares/auth.middleware";
import { IUser } from '../../src/models/user'

jest.mock('./../../src/middlewares/auth.middleware', () => ({
  authenticate: jest.fn(),
}));

export const authSetup = async (user?: IUser) => {
  // Mock the auth middlewares
  const mockAuthenticate = authenticate as jest.Mock;
  mockAuthenticate.mockImplementation(async (req, res, next) => {
    req.user = user;
    next(); // Call `next` to simulate successful authentication
  });

  return mockAuthenticate;
};
