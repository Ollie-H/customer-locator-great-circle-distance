// ...
// it('should reject if SIGINT is sent', function () {
//   let emitter = new EventEmitter();
//   sandbox.stub(readline, 'createInterface', function () {
//     emitter.close = () => {};
//     return emitter;
//   });

//   let promise = getMsg().then(function() {
//     throw Error('should not have resolved');
//   }, function (err) {
//     expect(true).to.be.equal(true);
//   });

//   emitter.emit('SIGINT');

//   return promise;
// });

import run from './app';
import { EventEmitter } from 'events';
import readline from 'readline';
import CustomerFileParser from './util/CustomerFileParser';
import Parloa from './models/Parloa';
import Logger from './util/Logger';

const parloa = new Parloa();
const logger = new Logger(jest.fn());
const customerFileParser = new CustomerFileParser('test', parloa, logger);
const emitter = new EventEmitter();

jest.mock('fs');
jest.mock('readline');

(readline.createInterface as jest.Mock).mockImplementation(() => {
  // @ts-ignore
  emitter.close = () => null;
  return emitter;
});

const parseLineSpy = jest.spyOn(customerFileParser, 'parseLine').mockImplementation(() => null);
const inviteCustomersSpy = jest.spyOn(customerFileParser, 'inviteCustomers').mockImplementation(() => null);

describe('App file', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('create interface is called', () => {
    run(customerFileParser);
    expect(readline.createInterface as jest.Mock).toBeCalled();
  });

  test('parseLine & inviteCustomers are not called before events are fired', () => {
    run(customerFileParser);
    expect(parseLineSpy).not.toBeCalled();
    expect(inviteCustomersSpy).not.toBeCalled();
  });

  test("'line' event calls parseLine", () => {
    run(customerFileParser);
    emitter.emit('line', 'LINE OF MOCK TEXT');
    expect(parseLineSpy).toBeCalledWith('LINE OF MOCK TEXT');
    expect(inviteCustomersSpy).not.toBeCalled();
  });

  test("'close' event calls inviteCustomers", () => {
    run(customerFileParser);
    emitter.emit('close');
    expect(parseLineSpy).not.toBeCalled();
    expect(inviteCustomersSpy).toBeCalled();
  });
});
