import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "./api";


const ProductsTotalAlt = props => {

    const [item, setItem] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const data = await fetchProducts();
          setItem(data);
        }
        fetchData();
    }, [props.newProduct]);

    return (
        <div>
            <h3>Total Products:</h3>
            <p>Total products at IMB = {item.length}</p>
        </div>
      );
}

export default ProductsTotalAlt;