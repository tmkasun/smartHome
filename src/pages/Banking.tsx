import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { APIOrigin } from 'utils/configs';

// components
import Page from 'components/Page';
import BankCard from 'components/BankCard';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [banks, setBanks] = useState<[{ accountNumber: string; name: string; user: any }] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  console.log(isLoading);
  console.log(error);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${APIOrigin}/banks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(setBanks)
      .catch((e) => {
        console.log('error', e);
        setError(e);
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
