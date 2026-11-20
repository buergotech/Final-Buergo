
import languageCodes from "./utils/languageCodes";
import httpRequest from "./utils/http-request";
import "regenerator-runtime/runtime";

const { languageInEnglish, alpha2Codes } = languageCodes;

const capitalize = (language: string) => {
  return language.charAt(0).toUpperCase() +
    language.toLowerCase().slice(1);
};

const getAlpha2Code = (language: string) => {
  const codeIndex = languageInEnglish.findIndex(
    (item) => item.toLowerCase() === language.trim().toLowerCase()
  );

  return codeIndex === -1 ? undefined : alpha2Codes[codeIndex];
};

const countryExtractor = (
  countriesObject: { name: string }[]
) => {
  return countriesObject.map((country) => country.name);
};

const countryListLookup = async (alpha2Code: string | undefined) => {
  if (!alpha2Code) {
    throw new Error("Language not found");
  }

  const res = await httpRequest(alpha2Code);

  return countryExtractor(res.data);
};

const getResponse = (
  language: string,
  listOfPlaces: string[]
) => {
  return `${capitalize(language)} is spoken in ${listOfPlaces.length} countries around the world`;
};

export {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse,
};
