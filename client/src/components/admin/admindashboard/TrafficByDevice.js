import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import BoxSx from './BoxSx';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LatestEventsTable from './LatestEventsTable';


export const TrafficByDevice = () => {

  return (
    <>
    <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', m:2, width:'90%'}}>
      <Grid item xs={4}>
        <BoxSx title="Users"/>
      </Grid>
      <Grid item xs={4}>
      <BoxSx title="Companies"/>
      </Grid>
      <Grid item xs={4}>
      <BoxSx title="Managers"/>
      </Grid>
      <Grid item xs={12} sx={{boxShadow:4,mt:3}}>
        <BarChart/>
      </Grid>
      <Grid item xs={5} sx={{boxShadow:4,mt:3}}>
      <PieChart/>
      </Grid>
      <Grid item xs={6} sx={{boxShadow:4,mt:3}}> 
      <LatestEventsTable/>
      </Grid>
    </Grid>
    

    </>
  );
};