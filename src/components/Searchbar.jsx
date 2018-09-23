import React from 'react';
import $ from 'jquery';
import Autocomplete from 'react-autocomplete';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

/* eslint react/prop-types: 0 */
class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.SEARCH_DEPTH = 200;

    $.getJSON('/json/cities.min.json', json => {
      this.cities = json;
    });

    this.state = {
      value: '',
      matchedCities: [],
    };

    this.trimmedCities = AwesomeDebouncePromise(
      this.trimmedCities.bind(this),
      500
    );
  }

  async onChange(value) {
    this.setState({ value });
    const matchedCities = await this.trimmedCities();
    this.setState({ matchedCities });
  }

  /* Searches array of >200k .json entries */
  trimmedCities() {
    let { value } = this.state;

    /* Keep track of multiple records for same city of same country */
    const trackDups = [];
    value = value.toLowerCase();

    const filtered =
      value.length < 1
        ? []
        : this.cities.filter(item => {
            const cityCountry = `${item.name}, ${item.country}`.toLowerCase();
            if (
              (cityCountry.split(',')[0].startsWith(value) ||
                cityCountry.startsWith(value)) &&
              !trackDups.includes(cityCountry)
            ) {
              trackDups.push(cityCountry);
              return true;
            }
            return false;
          });

    /* Many dropdown results (>500) cripple performance
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
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: '50%',
          zIndex: '998',
        }}
      />
    );
  }
}

export default Searchbar;
