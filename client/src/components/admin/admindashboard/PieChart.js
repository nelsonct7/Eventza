import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { region: 'Managers', val: 4119626293 },
  { region: 'Users', val: 1012956064 },
  { region: 'Companies', val: 344124520 },
];

export default function PieChart() {
    const [chartData,setChartData]=useState(data)
    return (
      <Paper sx={{mt:2}}>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          <Title
            text="Site Users Statistic"
          />
          <Animation />
        </Chart>
      </Paper>
    );
}
