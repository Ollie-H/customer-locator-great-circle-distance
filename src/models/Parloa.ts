import Company from "./Company";

class Parloa extends Company {
  customers: Company[] = [];

  constructor() {
    super('parloa', 52.493256, 13.446082);
  }

  addCustomer(customer: Company) {
    customer.setDistanceToPaloa(this.location);
    this.customers.push(customer);
  }

  sortCustomers(sortByProperty?: keyof Company) {
    this.customers = this.customers.sort((a, b) => {
      if(a[sortByProperty] < b[sortByProperty]) { return -1; }
      if(a[sortByProperty] > b[sortByProperty]) { return 1; }
      return 0;
    });
  }

  findCustomersWithinDistance(distance: number) {
    return this.customers.filter(customer => customer.distanceToParloa <= distance);
  }
}

export default Parloa;