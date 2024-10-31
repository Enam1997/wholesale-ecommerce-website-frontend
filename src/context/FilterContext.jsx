import React, { createContext, useContext, useState } from "react";

// Create a context to hold filter data
const FilterContext = createContext();

// Custom hook for accessing the filter context
const useFilterContext = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  // Default filter values
  const [filters, setFilters] = useState({
    search: "",
    category: [],
    subcategory: [],
    minPrice: 0,
    maxPrice: 100000,
    discount: "",
    newArrival: 0,
    occasion: [],
    material: [],
    sortOrder: "ASC",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // console.log("Filter Change", name, value);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      search: "",
      category: [],
      subcategory: [],
      minPrice: 0,
      maxPrice: 100000,
      discount: "",
      newArrival: 0,
      occasion: [],
      material: [],
      sortOrder: "DESC",
    });
  };

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, handleFilterChange, clearFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { useFilterContext, FilterProvider };
