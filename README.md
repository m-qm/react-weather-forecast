# React Weather forecast

This project was bootstrapped with my opinionated Skeleton [Create React App Enhanced](https://github.com/fllprbt/create-react-app-enhanced)   (Create React App + [Prettier, SCSS, Airbnb eslint, Standard stylelint, Testing scripts]). The project is unejected.

It offers [Recharts](https://github.com/recharts/recharts) visualization of the data retrieved from OpenWeatherMap's
- [Current weather data](https://openweathermap.org/current)
- [5 day / 3 hour forecast](https://openweathermap.org/forecast5) 

end points.

The searchbar's autocomplete suggestions are built with [OpenWeatherMap's city list](http://bulk.openweathermap.org/sample/city.list.json.gz) so that API calls are made via city id's. According to OpenWeatherMap, this is the only 100% non-ambiguous solution when querying the API for weather data.

Any forks/contribution are more than welcome.
