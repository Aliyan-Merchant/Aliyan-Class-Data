import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Carspage() {
  const [products, setProducts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetching data from the API
  const getData = async () => {
    try {
      const res = await axios.get('https://freetestapi.com/api/v1/cars');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered products based on selected company and search term
  const filteredProducts = products.filter((item) => {
    const matchesCompany = selectedCompany
      ? item.make.toLowerCase() === selectedCompany.toLowerCase()
      : true;
    const matchesSearchTerm = item.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.model.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCompany && matchesSearchTerm;
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="logo">
            <h1>Welcome To Cars Page</h1>
          </div>

          <div className="filter d-flex">
            <div className="dropdown">
              <label htmlFor="car">Select Car Company:</label>
              <select
                id="car"
                className="form-select"
                value={selectedCompany}
                onChange={handleDropdownChange}
              >
                <option value="">All Cars</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Nissan">Nissan</option>
                <option value="BMW">BMW</option>
                <option value="Tesla">Tesla</option>
                <option value="Audi">Audi</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Subaru">Subaru</option>
                <option value="Lexus">Lexus</option>
                <option value="Jeep">Jeep</option>
                <option value="Kia">Kia</option>
              </select>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search by name"
                  aria-label="Search"
                  value={searchTerm} // Bind search input value to searchTerm state
                  onChange={handleSearchChange} // Call function to update search term on input change
                />
                <button className="btn btn-outline-success" type="button">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Filtered products */}
      {filteredProducts.map((item) => {
        const { id, make, model, year, color, price, image } = item;

        return (
          <center key={id}>
            <div className="card col-md-10 m-20">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src={image} className="img-fluid rounded-start" alt={make + ' ' + model} />
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="card-body">
                    <h2 className="card-title">
                      {make}, {model}
                    </h2>
                    <h3 className="card-text">{year}</h3>
                    <h4 className="card-text">{color}</h4>
                    <h5 className="card-text">${price}</h5>
                  </div>
                </div>
              </div>
            </div>
          </center>
        );
      })}
    </>
  );
}

export default Carspage;
