import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'FaceBook',
    value: 2323,
    icon: <Icon icon={facebookFill} color="#1877F2" width={32} height={32} />,
  },
  {
    name: 'Google',
    value: 3132,
    icon: <Icon icon={googleFill} color="#DF3E30" width={32} height={32} />,
  },
];

function SiteItem({ site }) {
  const { icon, value, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{fShortenNumber(value)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AppTrafficBySite() {
  return (
    <Card>
      <CardHeader title="Traffic by Site" />
      <CardContent>
        <Grid container spacing={2}>
          {SOCIALS.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object,
};
