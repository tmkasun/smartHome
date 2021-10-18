// material
import { Box, Container, Typography, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// components
import Page from 'components/Page';
// import BankCard from 'components/BankCard';
import { useAllowedNumbers } from 'data/telco';

// ----------------------------------------------------------------------

export default function TelcoPage() {
  const [allowedNumbers, error, isLoading] = useAllowedNumbers();
  console.log(allowedNumbers);
  console.log(error);
  return (
    <Page title="Knnect | Mobile">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Mobile Center</Typography>
          {isLoading && <CircularProgress />}
        </Box>
        <Paper>Wola</Paper>
      </Container>
    </Page>
  );
}
