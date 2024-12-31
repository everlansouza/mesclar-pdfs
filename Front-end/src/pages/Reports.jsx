import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('/api/reports'); 
      setData(response.data);
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1>Relatórios de Uso</h1>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalMerges" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Reports;