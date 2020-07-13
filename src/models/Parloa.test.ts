import Parloa from './Parloa';
import Location from './Location';
import Company from './Company';

const mockCompany = new Company('47a83870-994d-4741-b169-da4651c5b4c2', 51.00189352, 18.19409139);
const setDistanceToPaloaSpy = jest.spyOn(mockCompany, 'setDistanceToPaloa');

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Class is created correctly', () => {
    const parloa = new Parloa();
    expect(parloa.id).toEqual('parloa');
    expect(parloa.customers).toEqual([]);
    expect(parloa.location).toEqual(new Location(52.493256, 13.446082));
    expect(parloa.addCustomer).toBeInstanceOf(Function);
    expect(parloa.findCustomersWithinDistance).toBeInstanceOf(Function);
    expect(parloa.sortCustomers).toBeInstanceOf(Function);
  });

  test('addCustomer calls setDistanceToPaloa and updates customers', () => {
    const parloa = new Parloa();
    parloa.addCustomer(mockCompany);
    expect(setDistanceToPaloaSpy).toBeCalledWith(parloa.location);
    expect(parloa.customers.length).toEqual(1);
    expect(parloa.customers[0]).toEqual(mockCompany);
  });

  test('sortCustomers sorts by property desc', () => {
    const parloa = new Parloa();
    parloa.addCustomer(mockCompany);
    parloa.addCustomer(new Company('99999', 51.00189352, 18.19409139));
    expect(parloa.customers.length).toEqual(2);
    expect(parloa.customers[0].id).toEqual(mockCompany.id);
    expect(parloa.customers[1].id).toEqual('99999');
  });

  test('findCustomersWithinDistance finds companies within distance', () => {
    const parloa = new Parloa();
    parloa.addCustomer(mockCompany);
    parloa.addCustomer(new Company('99999', 53.14583735, 13.23311883));
    const customersWithinDistance = parloa.findCustomersWithinDistance(100);
    expect(customersWithinDistance.length).toEqual(1);
    expect(customersWithinDistance[0].id).toEqual('99999');
  });
});
