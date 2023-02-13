import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';

export const Budget = (props) => (
  <Card {...props} sx={{height:"100%"}}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL APPLICANTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
             24
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="error" />
        <Typography
        color="error"
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          9
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Recently Onboarded
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
