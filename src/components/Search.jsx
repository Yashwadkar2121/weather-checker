import PropTypes from "prop-types";

const Search = ({ city, setCity, handleSearch }) => {
  return (
    <div className="p-1 flex justify-center items-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border-2 rounded-lg text-lg md:text-xl w-full lg:max-w-lg lg:p-3 p-1 mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-3 md:px-4 py-1 px-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

Search.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
