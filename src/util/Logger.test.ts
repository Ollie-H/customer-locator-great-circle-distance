import Logger from "./Logger";

const log = jest.fn();
const logger = new Logger(log);

describe("Logger", () => {
  test("logger works", () => {
    logger.log("message");
    expect(log).toBeCalledWith('message');
  });
});