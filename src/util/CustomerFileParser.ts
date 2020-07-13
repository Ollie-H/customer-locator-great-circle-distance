import Parloa from '../models/Parloa';
import Logger from './Logger';
import Company from '../models/Company';

class CustomerFileParser {
  regex = /^id\:(?:\s+)?([a-z0-9\-]+),(?:\s+)?lat:(?:\s+)?([0-9.]+),(?:\s+)?long:?(?:\s+)?([0-9.]+),/;
  filePath: string;
  parloa: Parloa;
  logger: Logger;

  constructor(filePath: string, parloa: Parloa, logger: Logger) {
    this.filePath = filePath;
    this.parloa = parloa;
    this.logger = logger;
  }

  parseLine(line: string): void {
    const match = line.match(this.regex);

    if (!match) {
      this.logger.log(`line ${line} does not have complete customer data.`);
      return;
    }

    const [, id, lat, long] = match;

    this.parloa.addCustomer(new Company(id, parseFloat(lat), parseFloat(long)));
  }

  inviteCustomers(distance = 100) {
    this.parloa.sortCustomers('id');
    this.parloa.findCustomersWithinDistance(distance).forEach((customer) => {
      this.logger.log(
        `${customer.id}: Invite customer ${customer.id} to company anniversary, distace to Paloa (km): ${customer.distanceToParloa}`,
      );
    });
  }
}

export default CustomerFileParser;
