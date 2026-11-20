
import {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse,
} from "./language_spoken";

import httpRequest from "./utils/http-request";

jest.mock("./utils/http-request");

describe("Language Spoken Tests", () => {
  it("converts array of country data objects to array of countries", () => {
    const inputObject = [
      { name: "Argentina", capital: "Buenos Aires" },
      { name: "Belize", capital: "Belmopan" },
      { name: "Bolivia", capital: "Sucre" },
    ];

    const actualValue = countryExtractor(inputObject);

    expect(actualValue[0]).toEqual("Argentina");
    expect(actualValue).toContain("Belize");
    expect(actualValue[2] === "Bolivia").toBe(true);
    expect(actualValue[3]).not.toBeDefined();
  });

  it("tests the asynchronous countryListLookup function", async () => {
    const mockCountries = [
      { name: "Argentina" },
      { name: "Belize" },
      { name: "Bolivia" },
    ];

    httpRequest.mockResolvedValue({
      data: mockCountries,
    });

    const actualValue = await countryListLookup("en");

    expect(actualValue).toEqual([
      "Argentina",
      "Belize",
      "Bolivia",
    ]);

    expect(httpRequest).toHaveBeenCalledWith("en");
  });
});
