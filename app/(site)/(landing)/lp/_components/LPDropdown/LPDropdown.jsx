import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import Image from 'next/image';
import { CartContext } from "@/context/Cart.context";
import { InputsContext } from "@/context/Inputs.context";
import PaymentMethods from "../../_utils/PaymentMethods";
import CityList from "../../_utils/CityList";
import "./LPDropdown.scss";
import axios from "axios";
import { axiosInstance } from '@/shared/http-interceptor';

// Function to fetch subcities based on city ID
export const getSubCityById = async (id) => {
  if (id ){
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

const LPDropdown = ({ data, val, name, label, ID }) => {
  const { orderData, setOrderData } = useContext(InputsContext);
  const { updateCartField } = useContext(CartContext);

  const [dropDownItems, setDropDownItems] = useState([]);
  const [dropdownName, setDropdownName] = useState('');

  const extractProperty = (items, key, value, searchKey) => {
    if (!Array.isArray(items) || items.length === 0) {
      return undefined;
    }
    const item = items.find(item => item[key] === value);
    return item ? item[searchKey] : undefined;
  };

  const getDisplayValue = (name) => {
    if (!orderData[name]) return '';

    const { value } = orderData[name];
    const displayedVal = dropDownItems.find(el => el.Id === parseInt(value, 10));

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

  const onDropdownChange = (name, id, value) => {

    // Extract the new ID based on the current dropdown name context.
    let extractedId = extractProperty(dropDownItems, dropdownName === "CityId" ? 'CityName' : dropdownName === "PaymentMethod" ? 'Method' : 'SubName', value, "Id");

    // Only update if the new value or new ID actually changes, preventing unnecessary re-renders.
    if (value && extractedId && (orderData[name]?.value !== value || orderData[name]?.id !== extractedId)) {
      setOrderData(prev => ({ ...prev, [name]: { id: extractedId, value } }));
      updateCartField(ID, dropdownName, parseInt(extractedId, 10));
    }
  };
  
  useEffect(() => {
    setDropdownName(data);  // Ensure the dropdown name is updated based on current data type
    if (data === "CityId") {
      const fetchCities = async () => {
        try {
          const res = await axiosInstance('city/citylist')
          setDropDownItems(res.data);
        } catch ( error ) {
          console.log("Error Fetching Cities Data");
        }
      }
      fetchCities()
    } else if (data === 'PaymentMethod') {
      const fetchPaymentMethods = async () => {
        try {
          const res = await axiosInstance('shopSettings/getPaymentMeths/false')
          setDropDownItems(res.data);
        } catch ( error ) {
          console.log("Error Fetching Payment Methods Data");
        }
      }
      fetchPaymentMethods()

      // 
      setDropDownItems(PaymentMethods);
    } else if (data === 'SubCityId') {
      const fetchSubCities = async () => {
        try {
          const cityId = orderData['CityId']['value'];
          const subCitiesData = await getSubCityById(cityId);
          setDropDownItems(subCitiesData);
          if ( dropDownItems.length > 1 ) {
            setOrderData((prev) => {
              return {...prev, "SubCityId" : {
                  "FieldId": 97,
                  "FieldName": "SubCityId",
                  "FieldValue": null
              }}
            })

            updateCartField(ID, dropdownName, parseInt(extractedId, 10));
          }
        } catch (error) {
          console.error('Error fetching sub cities:', error);
          setDropDownItems([]);
        }
      };
      fetchSubCities();
    }
  }, [data, orderData['CityId']?.value]);

  return (
    <div
      style={{display: dropDownItems.length > 1 ? '' : 'none'}
    }>
      {
        dropDownItems.length > 1 &&
        <Autocomplete
        className="w-full"
        variant={'underlined'}
        id={name + '-' + ID}
        key={name + '-' + ID}
        inputValue={getDisplayValue(name)}
        onInputChange={(val) => onDropdownChange(name, ID, val)}
        name={name}
        label={label}
      >
        {dropDownItems.map((item, index) => (
          <AutocompleteItem
            key={`${item.Id}-${index}`}
            value={dropdownName === "CityId" ? item.CityName : dropdownName === "PaymentMethod" ? item.Method : item.SubName}
            startContent={dropdownName === 'PaymentMethod' && (
              <Image
                alt={item.Method || item.SubName}
                src={`/PaymentMethods/${item.Logo}`}
                width={20}
                height={20}
                className="paymentMethod__Icon"
              />
            )}
          >
            {dropdownName === "CityId" ? item.CityName : dropdownName === "PaymentMethod" ? item.Method : item.SubName}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      }
    </div>
  );
};