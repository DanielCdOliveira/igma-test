import { jest } from "@jest/globals";
import { usersArray } from "../../factories/userFactory.js";
export const mockCreateUser = jest.fn(() => {});
export const mockGetAllUsers = jest.fn(() => {
  return usersArray;
});
const mock = jest.fn().mockImplementation(() => {
  return { createUser: mockCreateUser, getAllUsers: mockGetAllUsers };
});
