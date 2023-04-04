import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "./api";

const ProductsFinalAlt = props => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts();
      setItem(data);
    }
    fetchData();
  }, [props.newProduct]);

  return (
    <>
      <h2>Product Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Product Owner</th>
            <th>Scrum Master</th>
            <th>Developers</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(item).map((productID, index) => {
            const itemData = item[productID];
            return (
              <tr key={productID}>
                <td>{index + 1}</td>
                <td>{itemData.productName}</td>
                <td>{itemData.productOwnerName}</td>
                <td>{itemData.scrumMasterName}</td>
                <td>
                  {itemData.developers &&
                    (typeof itemData.developers === "string"
                      ? itemData.developers.split(",")
                      : itemData.developers).map((developer, index) => (
                      <li key={index}>{developer.trim()}</li>
                    ))}
                </td>
                <td>{itemData.startDate}</td>
                <td>{itemData.methodology}</td>
                <td>{itemData.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ProductsFinalAlt;
