import React, { useState } from 'react';
import defaultValues from './defaultValues';
import './styles.css'

const CreateProductFinalAlt = (props) => {

  const [formData, setFormData] = useState({
      productName: '',
      productOwnerName: '',
      developers: [],
      scrumMasterName: '',
      startDate: '',
      methodology: 'Agile',
      status: 'Modernization needed',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await props.handleCreateProduct(formData);
      props.setNewProduct((prevProducts) => [...prevProducts, formData]);
      alert('Product has been added to the inventory.');
      setFormData({
        productName: '',
        productOwnerName: '',
        developers: [],
        scrumMasterName: '',
        startDate: '',
        methodology: 'Agile',
        status: 'Modernization needed',
      });      
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((formData) => {
        const developers = formData.developers || [];
        const index = developers.indexOf(value);
        if (checked && index === -1) {
          developers.push(value);
        } else if (!checked && index !== -1) {
          developers.splice(index, 1);
        }
        return { ...formData, developers };
      });
    } else if (type === 'radio') {
      setFormData({ ...formData, scrumMasterName: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  return (
    <>
    <h2>Add a Product</h2>
    <div className='form-container'>
      <form className ='form-wrapper' onSubmit={handleSubmit}>
        <div className= "row">
          <div class="col-25">
            <label htmlFor="productName">Product Name:</label>
          </div>
          <div className="col-75">
          <input 
            className="form-field"
            type="text" 
            size="40"
            name="productName" 
            value={formData.productName}
            onChange={handleChange}
            />
          <br />
          </div>
        </div>
        <div className= "row">
          <div class="col-25">
            <label htmlFor="productOwnerName">Product Owner Name:</label>
          </div>
          <div className="col-75">
            <input 
              className="form-field"
              type="text" 
              name="productOwnerName" 
              value={formData.productOwnerName}
              onChange={handleChange}
              />
            <br />
          </div>
        </div>
        <div className= "row">
          <fieldset className="form-fieldset">
            <legend>Developers - Max 5:</legend>
            {Object.keys(defaultValues)
                    .filter((key) => key.startsWith("developer"))
                    .map((key) => (
                        <label key={key}>
                            <input
                                
                                type="checkbox"
                                name="developers"
                                value={defaultValues[key]}
                                
                                onChange={handleChange}
                                />
                                {defaultValues[key]}
                            </label>
                    ))}
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-fieldset">
              <legend>Scrum Master:</legend>
              {Object.keys(defaultValues)
                    .filter(key => key.startsWith('scrumMasterName'))
                    .map(key => (
                        <label key={key}>
                            <input 
                                
                                type="radio" 
                                name="scrumMasterName" 
                                value={defaultValues[key]} 
                                onChange={handleChange}
                                />
                                {defaultValues[key]}
                            </label>
                    ))}
          </fieldset>
          <br />
        </div>
        <div className="row">
          <div class="col-25">
            <label htmlFor="startDate">Start Date:</label>
          </div>
          <div className="col-75">
                <input 
                    className="form-field"
                    type="date" 
                    name="startDate" 
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    />
            <br />
          </div> 
        </div>
        <div className="row">
        <div class="col-25">
          <label htmlFor="methodology">Methodology:</label>
        </div>
        <div className="col-75">
                <select 
                    className="form-field"
                    name="methodology" 
                    id="methodology"
                    value={formData.methodology}
                    onChange={handleChange}
                >
                        <option value="Agile">Agile</option>
                        <option value="Waterfall">Waterfall</option>
                </select>
          <br />
          </div>
        </div>
        <div className="row">
          <div class="col-25">
            <label htmlFor="status">Status:</label>
          </div>
          <div className="col-75">
                <select 
                    className="form-field"
                    name="status" 
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Modernization needed">Modernization needed</option>
                    <option value="In progress">In progress</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            <br />
            </div>
        </div>
        <div className="row">
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateProductFinalAlt;
