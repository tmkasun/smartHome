// material
import { Box, Grid, Container, Typography, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MobileRadioSelector from 'components/MobileRadioSelector';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';

// components
import Page from 'components/Page';
// import BankCard from 'components/BankCard';
import { useAllowedNumbers, useSubmitTopUp } from 'data/hooks/telcoHooks';
import { useState } from 'react';
import MobilePriceBox from 'components/MobilePriceBox';

// ----------------------------------------------------------------------

const SubTitle = ({ children }: { children: string }) => (
  <Box sx={{ color: 'text.secondary' }} ml={2} pt={3}>
    <Typography variant="h5">{children}</Typography>
  </Box>
);

const DEFAULT_AMOUNTS = [32.23, 51.34, 101.23, 995, 450];
export default function TelcoPage() {
  const [allowedNumbers, , isLoading] = useAllowedNumbers();
  const [customNumber, setCustomNumber] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('0711661919');
  const [selectedAmount, setSelectedAmount] = useState(DEFAULT_AMOUNTS[0]);
  // submitResponse, submitErrors,
  const [submitResponse, submitErrors, isSubmitting, topUp] = useSubmitTopUp();
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async () => {
    const finalAmount = selectedAmount === -1 ? customAmount : selectedAmount;
    const finalNumber = selectedNumber === 'custom' ? customNumber : selectedNumber;
    let styledMessage;

    if (finalAmount > 2000) {
      styledMessage = (
        <>
          Amount
          <Box
            mx={1}
            p={0.5}
            sx={{ fontWeight: 'bold', bgcolor: 'text.disabled', borderRadius: 16 }}
          >
            {finalAmount}
          </Box>{' '}
          exceed 2000 Rs max
        </>
      );
      enqueueSnackbar(styledMessage, {
        variant: 'error',
      });
      return;
    }
    if (finalNumber.toString().length !== 10) {
      styledMessage = (
        <>
          Number
          <Box
            mx={1}
            p={0.5}
            sx={{ fontWeight: 'bold', bgcolor: 'text.disabled', borderRadius: 16 }}
          >
            {finalNumber}
          </Box>{' '}
          is invalid
        </>
      );
      enqueueSnackbar(styledMessage, {
        variant: 'error',
      });
      return;
    }
    topUp(finalNumber, Number(finalAmount));
  };
  return (
    <Page title="Knnect | Mobile">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Mobile Center</Typography>
          {isLoading && <CircularProgress data-testid="initial-loader" />}
        </Box>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ height: '100%' }}>
              <SubTitle>Phone Number</SubTitle>
              <Box ml={2} mb={5} mt={2}>
                <RadioGroup
                  name="use-radio-group"
                  onChange={(e) => setSelectedNumber(e.target.value)}
                  value={selectedNumber}
                >
                  {allowedNumbers?.list.map((mobileNumber) => (
                    <MobileRadioSelector
                      key={mobileNumber}
                      value={mobileNumber}
                      label={mobileNumber}
                      control={<Radio />}
                    />
                  ))}
                  <MobileRadioSelector
                    value="custom"
                    label={
                      <TextField
                        label="Other number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        onFocus={() => setSelectedNumber('custom')}
                      />
                    }
                    control={<Radio />}
                  />
                </RadioGroup>
              </Box>
              <Divider variant="middle" />
              <SubTitle>Amount</SubTitle>
              <Box m={2}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}
                >
                  {DEFAULT_AMOUNTS.map((amount) => (
                    <MobilePriceBox
                      isSelected={amount === selectedAmount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      amount={amount}
                      key={amount}
                    />
                  ))}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Other Amount"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      onFocus={() => setSelectedAmount(-1)}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" justifyContent="flex-end" pb={2} mr={2}>
                {submitResponse?.reference}
                {submitErrors && submitErrors.toString()}
                <LoadingButton
                  loading={isSubmitting}
                  onClick={submitHandler}
                  color="error"
                  variant="outlined"
                >
                  Submit
                </LoadingButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
