import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    const toggleText = (text) => {
    setSearchText(text);
    }
  
    return (
      <SearchContext.Provider value={{ searchText, toggleText}}>
        {children}
      </SearchContext.Provider>
    );
  
}

SearchProvider.propTypes = {
children: PropTypes.node.isRequired,
};

export const useSearch = () => useContext(SearchContext);
