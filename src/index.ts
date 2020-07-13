import fs from 'fs';
import readline from 'readline';
import Parloa from "./models/Parloa";
import Logger from "./util/Logger";
import CustomerFileParser from "./util/CustomerFileParser";

const parloa = new Parloa();
const logger = new Logger(console.log);
const customerFileParser = new CustomerFileParser(__dirname + '/customer.txt', parloa, logger);

readline.createInterface({
  input: fs.createReadStream(customerFileParser.filePath)
}).on('line', customerFileParser.parseLine.bind(customerFileParser))
  .on('close', customerFileParser.inviteCustomers.bind(customerFileParser));
