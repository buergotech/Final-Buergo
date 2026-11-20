import axios from "axios";

const httpRequest = async (alpha2Code: string) => {
  const result = await axios.get(
    `https://restcountries.com/v2/lang/${alpha2Code}`
  );

  console.log("FULL API RESPONSE:", result.data);
  console.log("IS ARRAY:", Array.isArray(result.data));

  return result;
};

export default httpRequest;