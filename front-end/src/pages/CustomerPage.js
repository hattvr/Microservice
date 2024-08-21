import '../App.css';

import React, { useEffect, useState } from 'react';
import { deleteById, getAll, post, put } from '../restdb';

import { CustomerAddUpdateForm } from '../CustomerAddUpdateForm';
import { CustomerList } from '../CustomerList';

function CustomerPage() {
  let blankCustomer = {"id": -1, "name": "", "email": "", "password": "", "role": ""};
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = formObject.id === -1 ? "Add" : "Update";

  useEffect(() => { getCustomers() }, [formObject]);

  const getCustomers = function () {
    console.log("in getCustomers()");
    getAll(setCustomers);
  }

  function rowSelectionHandler(customer = null) {
    // find entries by customer-row class and set font weight to normal
    for (let i = 1; i < document.getElementsByClassName("customer-row").length; i++) {
      document.getElementsByClassName("customer-row")[i].style.fontWeight = "normal";
    }
    
    if (customer) {
      const rows = document.getElementsByClassName("customer-row");
    
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Assuming you have the customer's name or another unique attribute in the first cell of each row
        const customerName = row.getElementsByTagName("td")[0].textContent.trim();

        if (customerName === customer.name) {
          row.style.fontWeight = "bold";
        } else {
          row.style.fontWeight = "normal"; // Reset font weight for non-selected rows
        }
      }
    }
  }

  let onDeleteClick = function () {
    console.log("in onDeleteClick()");
    let postOpCallback = () => { setFormObject(blankCustomer); }

    if (formObject.id >= 0) {
      deleteById(formObject.id, postOpCallback);
    } else {
      setFormObject(blankCustomer);
    } 
        
    rowSelectionHandler();
  }
  
  let onSaveClick = function () {
    console.log("in onSaveClick()");
    let postOpCallback = () => { setFormObject(blankCustomer); }

    if (formObject.id === -1) {
      post(formObject, postOpCallback);
    } else {
      put(formObject, postOpCallback);
    }

    rowSelectionHandler();
  }
  
  let onCancelClick = function () {
    console.log("in onCancelClick()");
    
    setFormObject(blankCustomer);
    rowSelectionHandler();
  }
  
  const handleListClick = function (customer) {
    console.log("in handleListClick()");

    const isAlreadySelected = formObject.id === customer.id;

    setFormObject(isAlreadySelected ? blankCustomer : customer);
    rowSelectionHandler(isAlreadySelected ? null : customer);
  }

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  return (
    <div className="App">
      <CustomerList 
        customers={customers} 
        handleListClick={handleListClick}
      />

      <br />

      <CustomerAddUpdateForm
        mode={mode}
        handleInputChange={handleInputChange}
        formObject={formObject}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
      />

    </div>
  );
}

export default CustomerPage;
