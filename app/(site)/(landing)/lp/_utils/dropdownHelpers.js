import axios from "axios";


export const getSubCityById = async (id) => {
  try {
    const response = await axios.get(`https://data-test.ezone.ly/api/city/subcitylist/${id}`)
    return response.data;
  } catch (err) {
    console.error("Error fetching sub cities:", err);
    throw err; // Rethrow the error for the calling function to handle
  }
};
