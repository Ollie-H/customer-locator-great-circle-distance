import app from './app';
import path from "path";
import Parloa from "./models/Parloa";
import Logger from "./util/Logger";
import CustomerFileParser from './util/CustomerFileParser';

const parloa = new Parloa();
const logger = new Logger(console.log);
const customerFileParser = new CustomerFileParser(path.join(__dirname, '..', '/customer.txt'), parloa, logger);

app(customerFileParser);