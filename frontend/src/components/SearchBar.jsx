function SearchBar({
    searchTerm,
    setSearchTerm,
  }) {
    return (
      <input
        type="text"
        placeholder="Search by name, email or company..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full p-3 border rounded-lg mb-6"
      />
    );
  }
  
  export default SearchBar;