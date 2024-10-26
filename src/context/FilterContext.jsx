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
    minPrice: 20,
    maxPrice: 100000,
    discount: "",
    newArrival: 0,
    occasion: [],
    material: [],
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // console.log("Filter Change", name, value);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};

export { useFilterContext, FilterProvider };
