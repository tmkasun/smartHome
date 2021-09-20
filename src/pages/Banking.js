import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// components
import Page from '../components/Page';
import BankCard from '../components/BankCard';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [banks, setBanks] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://home.knnect.com/apis/banks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(setBanks)
      .catch((error) => {
        console.log('error', error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Page title="Knnect | Financial">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Banking Center</Typography>
        </Box>
        <Grid container spacing={3}>
          {banks ? (
            banks.map(({ accountNumber, name, user }) => (
              <Grid key={accountNumber} item xs={12} sm={6} md={3}>
                <BankCard accountNumber={accountNumber} name={name} user={user} />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
    </Page>
  );
}
