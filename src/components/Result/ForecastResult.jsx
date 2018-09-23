import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/* eslint react/prop-types: 0 */
const ForecastResult = ({ data, types }) => (
  <div>
    {types.map(type => (
      <ResponsiveContainer
        key={type}
        width="100%"
        maxHeight={300}
        aspect={4.0 / 3}
      >
        <LineChart
          data={data[type]}
          margin={{ top: 10, right: 5, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="time" />
          <YAxis dataKey={type} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={type}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    ))}
  </div>
);
export default ForecastResult;
