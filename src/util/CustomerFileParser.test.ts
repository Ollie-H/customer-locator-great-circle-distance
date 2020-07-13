import CustomerFileParser from "./CustomerFileParser";
import Parloa from "../models/Parloa";
import Logger from "./Logger";
import Company from "../models/Company";

const filePath = 'test';
const mockLogMethod = jest.fn();
const parloa = new Parloa();
const logger = new Logger(mockLogMethod);
const mockExpectedCompany = new Company(
  "47a83870-994d-4741-b169-da4651c5b4c2",
  51.00189352,
  18.19409139,
);
const parloaAddCustomerSpy = jest.spyOn(parloa, 'addCustomer').mockImplementation(() => null);
const parloaSortCustomersSpy = jest.spyOn(parloa, 'sortCustomers').mockImplementation(() => null);
const parloaFindCustomersWithinDistanceSpy = jest.spyOn(parloa, 'findCustomersWithinDistance').mockImplementation(() => [mockExpectedCompany]);

const validCustomerStrings = [
  "id:47a83870-994d-4741-b169-da4651c5b4c2,lat:51.00189352,long:18.19409139,",
  "id:      47a83870-994d-4741-b169-da4651c5b4c2, lat: 51.00189352, long:18.19409139,",
  "id:      47a83870-994d-4741-b169-da4651c5b4c2, lat: 51.00189352, long:18.19409139,",
  "id:       47a83870-994d-4741-b169-da4651c5b4c2,lat:      51.00189352,long:            18.19409139,"
];

const invalidCustomerStrings = [
  "id:0&,lat:51.00189352,long:18.19409139,",
  "id:47a83870-994d-4741-b169-da4651c5b4c2, lat: x.00189352, long:18.19409139,",
  "id: 47a83870-994d-4741-b169-da4651c5b4c2, lat: 51.00189352, long:18.x,",
  "id:,lat:      d.00189352,long:            23d.19409139,"
];

describe("CustomerFileParser", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  afterAll(() => {
    jest.resetAllMocks();
  })
  
  test("Class is created correctly", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    expect(customerFileParser.filePath).toEqual(filePath);
    expect(customerFileParser.parloa).toBe(parloa);
    expect(customerFileParser.logger).toBe(logger);
  });

  test("Parse line, parses correctly and adds customer", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);

    expect.assertions(validCustomerStrings.length)

    validCustomerStrings.forEach((line) => {
      parloaAddCustomerSpy.mockClear();
      customerFileParser.parseLine(line);
      expect(parloaAddCustomerSpy).toBeCalledWith(mockExpectedCompany);
    })
  });


  test("Parse line, invalid data is logged out", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    expect.assertions(invalidCustomerStrings.length * 2)

    invalidCustomerStrings.forEach((line) => {
      mockLogMethod.mockClear();
      customerFileParser.parseLine(line);
      expect(mockLogMethod).toBeCalledWith(`line ${line} does not have complete customer data.`);
      expect(parloaAddCustomerSpy).not.toBeCalled();
    })
  });

  test("inviteCustomers sorts customers by id", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    customerFileParser.inviteCustomers();
    expect(parloaSortCustomersSpy).toBeCalledWith('id');
  });

  test("inviteCustomers finds customers by distane", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    customerFileParser.inviteCustomers();
    expect(parloaFindCustomersWithinDistanceSpy).toBeCalledWith(100);
  });

  test("inviteCustomers finds customers by distane with specified distance", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    customerFileParser.inviteCustomers(200);
    expect(parloaFindCustomersWithinDistanceSpy).toBeCalledWith(200);
  });

  test("inviteCustomers logs matched customers", () => {
    const customerFileParser = new CustomerFileParser(filePath, parloa, logger);
    customerFileParser.inviteCustomers(200);
    expect(mockLogMethod).toBeCalledTimes(1);
    expect(mockLogMethod).toBeCalledWith(`${mockExpectedCompany.id}: Invite customer ${mockExpectedCompany.id} to company anniversary, distace to Paloa (km): ${mockExpectedCompany.distanceToParloa}`);
  });

});