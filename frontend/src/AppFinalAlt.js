import React from "react";
import { useState } from 'react'

import ProductsTotalAlt from './ProductsTotalAlt.js'
import ProductsFinalAlt from './ProductsFinalAlt.js'
import CreateProductFinalAlt from "./CreateProductFinalAlt.js";
import { createProduct } from './api';


const AppFinalAlt = props => {

    const [newProduct, setNewProduct] = useState([]);

    const handleNewProduct = (formData) => {
        setNewProduct(formData);
    }

    const handleCreateProduct = async (formData) => {
        try {
          const response = await createProduct(formData);
          const newProduct = response.data;
          setNewProduct((prevProducts) => [...prevProducts, newProduct]);
        } catch (error) {
          console.error('Error creating product', error);
        }
    }
      
    return (
        <div className = "app-wrapper">
            <h1>Information Management Branch (IMB)</h1>
            <ProductsTotalAlt newProduct={newProduct}/>
            <CreateProductFinalAlt handleCreateProduct={handleCreateProduct} setNewProduct={setNewProduct} />
            <ProductsFinalAlt  newProduct={newProduct}/>

        </div>
      );

}

export default AppFinalAlt;
