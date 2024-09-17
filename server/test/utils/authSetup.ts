import { authenticate } from "../../src/middlewares/auth.middleware";

jest.mock('./../../src/middlewares/auth.middleware', () => ({
  authenticate: jest.fn(),
}));

export const authSetup = async () => {
  // Mock the auth middlewares
  const mockAuthenticate = authenticate as jest.Mock;
  mockAuthenticate.mockImplementation(async (req, res, next) => {
    next(); // Call `next` to simulate successful authentication
  });

  return mockAuthenticate;
};
