import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import StoreIcon from '@mui/icons-material/Store';

export default function BoxSx({title}) {
  return (
    <Box
      sx={{
        borderRadius:5,
        bgcolor:'#613dc1',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
        p:2,
        m:2
      }}
    >
      <Grid container sx={{display:'flex', flexDirection:'row'}} gap={2}>
       <Typography variant='h6'>{title}</Typography>
       {title==="Users" && <><GroupIcon sx={{width:50,height:50}}/> <Typography variant='h6'> : 200</Typography> </>}
       {title==="Managers" && <><PermContactCalendarIcon sx={{width:50,height:50}}/> <Typography variant='h6'> : 250</Typography></>}
       {title==="Companies" && <><StoreIcon sx={{width:50,height:50}}/> <Typography variant='h6'> : 300</Typography></>}
       </Grid>
    </Box>
  );
}