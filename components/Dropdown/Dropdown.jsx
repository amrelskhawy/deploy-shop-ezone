import { useState, useEffect, useContext } from "react"
import { InputsContext } from "@/context/Inputs.context";
import "./Dropdown.scss"
import { axiosInstance } from "@/shared/http-interceptor";
import { CartContext } from "@/context/Cart.context";
import axios from "axios"

export const getSubCityById = async (id) => {
  if (id) {
    try {
      const response = await axios.get(`https://data-test.ezone.ly/api/city/subcitylist/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching sub cities:", err);
      throw err;
    }
  }
  return ''
};

const Dropdown = ({
  name,
  label,
  ID,
  val,
}) => {
  // Intialize my states
  const [dropdownItems, setDropdownItems] = useState([])
  const { orderData, setOrderData } = useContext(InputsContext);
  const { updateCartField } = useContext(CartContext);

  const extractProperty = (items, key, value, searchKey) => {
    if (!Array.isArray(items) || items.length === 0) {
      return undefined;
    }
    const item = items.find(item => item[key] === value);
    return item ? item[searchKey] : undefined;
  };

  const getDisplayValue = (name) => {
    if (!orderData[name] || !Array.isArray(dropdownItems) || dropdownItems.length === 0) return '';

    const { value } = orderData[name];
    const displayedVal = dropdownItems.find(el => el.Id === parseInt(value, 10));

    // Determine the display field based on the name
    let displayField = '';
    switch (name) {
      case "CityId":
        displayField = 'CityName';
        break;
      case "PaymentMethod":
        displayField = 'Method';
        break;
      case "SubCityId":
        displayField = 'SubName';
        break;
      default:
        displayField = 'value'; // Fallback to using the value as the display
    }

    return displayedVal ? displayedVal[displayField] : '';
  };

  const onDropdownChange = (name, value) => {

    // Extract the new ID based on the current dropdown name context.
    let extractedId = extractProperty(dropdownItems, name === "CityId" ? 'CityName' : name === "PaymentMethod" ? 'Method' : 'SubName', value, "Id");

    // Only update if the new value or new ID actually changes, preventing unnecessary re-renders.
    if (value && extractedId && (orderData[name]?.value !== value || orderData[name]?.id !== extractedId)) {
      setOrderData(prev => ({ ...prev, [name]: { id: extractedId, value } }));
      updateCartField(ID, name, parseInt(extractedId, 10));
    }
  };


  // Fetching Items of Select based on the name 
  useEffect(() => {

    if (name === "CityId") {
      const fetchCities = async () => {
        try {
          const res = await axiosInstance('city/citylist')
          setDropdownItems(res.data);
        } catch (error) {
          console.log("Error Fetching Cities Data");
        }
      }
      fetchCities()
    }
    else if (name === 'PaymentMethod') {
      const fetchPaymentMethods = async () => {
        try {
          const res = await axiosInstance('shopSettings/getPaymentMeths/false')
          setDropdownItems(res.data);
        } catch (error) {
          console.log("Error Fetching Payment Methods Data");
        }
      }
      fetchPaymentMethods()

    } else if (name === 'SubCityId') {
      const fetchSubCities = async () => {
        try {
          const cityId = orderData['CityId']['value'];
          console.log(cityId);
          const subCitiesData = await getSubCityById(cityId);
          console.log(subCitiesData);
          setDropdownItems(subCitiesData);

          if (dropdownItems.length === 0) {
            setOrderData((prev) => {
              return {
                ...prev, "SubCityId": {
                  "FieldId": 97,
                  "FieldName": "SubCityId",
                  "FieldValue": null
                }
              }
            })

            updateCartField(ID, name, null);

          }
        } catch (error) {
          console.error('Error fetching sub cities:', error);
          setDropdownItems([]);
        }
      };
      fetchSubCities();
    }

  }, [name, orderData['CityId']?.value]);

  return (
    <div style={{
      display: dropdownItems.length === 0 && 'none'
    }} className="dropdown-field">
      <label className="dropdown-label" htmlFor={ID}>{label}</label>
      <select
        value={getDisplayValue(name)}
        onChange={(e) => onDropdownChange(e.target.name, e.target.value)}
        className="dropdown-select"
        id={ID}
        name={name}
      >
        <option value="" disabled hidden>برجاء الاختيار</option>
        {
          Array.isArray(dropdownItems) && dropdownItems.map((item, index) => (
            <option key={`${item.Id}-${index}`} value={item.Id}>
              {
                name === "CityId" ? item.CityName : name === "PaymentMethod" ? item.Method : item.SubName
              }
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default Dropdown