import React from 'react';
import Autocomplete from 'react-autocomplete';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import axios from 'axios';

/* Autocomplete menu styles */
const autocompleteMenu = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%',
  zIndex: '998',
};

/* eslint react/prop-types: 0 */
class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.SEARCH_DEPTH = 200;

    axios
      .get('/json/cities.min.json')
      .then(cities => {
        this.cities = cities.data;
      })
      .catch(error => {
        console.log(error);
      });

    this.state = {
      value: '',
      matchedCities: [],
    };

    this.trimCities = AwesomeDebouncePromise(this.trimCities.bind(this), 500);
  }

  async onChange(value) {
    this.setState({ value });
    const matchedCities = await this.trimCities(value);
    this.setState({ matchedCities });
  }

  /* Searches array of >200k .json entries for city, country match */
  trimCities(term) {
    /* Keep track of multiple records for same city of same country */
    const value = term.toLowerCase();
    const trackDups = [];

    const filtered =
      value.length < 1
        ? []
        : this.cities.filter(item => {
            const cityCountry = `${item.name}, ${item.country}`.toLowerCase();
            if (
              cityCountry.startsWith(value) &&
              !trackDups.includes(cityCountry)
            ) {
              trackDups.push(cityCountry);
              return true;
            }
            return false;
          });

    /* Many dropdown results (>500) cripple re-render performance
    *  Possible solution: react-virtualized */
    const matchedCities =
      filtered.length > this.SEARCH_DEPTH
        ? filtered.slice(0, this.SEARCH_DEPTH)
        : filtered;

    return matchedCities;
  }

  render() {
    const { value, matchedCities } = this.state;
    const { handleFetch } = this.props;

    return (
      <Autocomplete
        items={matchedCities}
        shouldItemRender={(item, term) =>
          item.name.toLowerCase().startsWith(term) ||
          `${item.name}, ${item.country}`
            .toLowerCase()
            .startsWith(term.toLowerCase())
        }
        getItemValue={item => item.name}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
          >
            {`${item.name}, ${item.country}`}
          </div>
        )}
        value={value}
        onChange={evt => this.onChange(evt.target.value)}
        onSelect={(_, item) => {
          this.setState({ value: `${item.name}, ${item.country}` });
          handleFetch(item.id);
        }}
        wrapperStyle={{ width: '100%' }}
        inputProps={{ style: { width: '100%' } }}
        menuStyle={autocompleteMenu}
      />
    );
  }
}

export default Searchbar;
