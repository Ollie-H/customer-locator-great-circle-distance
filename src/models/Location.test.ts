import Location from "./Location";
import Parloa from "./Parloa";

describe("Location", () => {
  
  test("Class is created correctly", () => {
    const location = new Location(100, 200);
    expect(location.latitude).toEqual(100);
    expect(location.longitude).toEqual(200);
    expect(location.calculateDistanceToLocation).toBeInstanceOf(Function);
  });

  test("calculateDistanceToLocation is zero at same location", () => {
    const parloa = new Parloa();
    const location = new Location(parloa.location.latitude, parloa.location.longitude);
    expect(location.calculateDistanceToLocation(parloa.location)).toEqual(0);
  });

  test("calculateDistanceToLocation is correct", () => {
    const parloa = new Parloa();
    const location = new Location(52.08043436, 12.44706698);
    expect(location.calculateDistanceToLocation(parloa.location)).toEqual(82.00253103957856);
  });

  test("calculateDistanceToLocation is correct", () => {
    const parloa = new Parloa();
    const location = new Location(52.28885695, 14.47946963);
    expect(location.calculateDistanceToLocation(parloa.location)).toEqual(73.71492628723338);
  });

});