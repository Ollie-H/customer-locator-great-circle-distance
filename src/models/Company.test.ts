import Company from './Company';
import Location from './Location';
import Parloa from './Parloa';

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Class is created correctly', () => {
    const company = new Company('id', 52.493256, 13.446082);
    expect(company.id).toEqual('id');
    expect(company.location).toEqual(new Location(52.493256, 13.446082));
    expect(company.setDistanceToPaloa).toBeInstanceOf(Function);
  });

  test('setDistanceToPaloa sets distance returned from location.calculateDistanceToLocation', () => {
    const parloa = new Parloa();
    const company = new Company('id', 52.493256, 13.446082);
    const calculateDistanceToLocationSpy = jest
      .spyOn(company.location, 'calculateDistanceToLocation')
      .mockReturnValueOnce(100);
    company.setDistanceToPaloa(parloa.location);
    expect(calculateDistanceToLocationSpy).toBeCalledWith(parloa.location);
    expect(company.distanceToParloa).toEqual(100);
  });
});
