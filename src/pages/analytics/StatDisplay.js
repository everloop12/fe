import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';


// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const StatDisplay = ({ color, title, count, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
        <Grid item>
          <Chip
            variant="combined"
            color={color}
            label={`${extra}`}
            sx={{ ml: 1.25, p: 1 }}
            size="small"
          />
        </Grid>
      </Grid>
    </Stack>
  </MainCard>
);

StatDisplay.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

StatDisplay.defaultProps = {
  color: 'primary'
};

export default StatDisplay;
