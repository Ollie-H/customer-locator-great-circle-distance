import fs from "fs";
import readline from 'readline';
import CustomerFileParser from "./util/CustomerFileParser";

const run = (fileParser: CustomerFileParser) => {
  readline.createInterface({
    input: fs.createReadStream(fileParser.filePath)
  })
    .on('line', fileParser.parseLine.bind(fileParser))
    .on('close', fileParser.inviteCustomers.bind(fileParser));
}

export default run;