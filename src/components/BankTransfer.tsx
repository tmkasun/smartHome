import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { APIOrigin } from 'utils/configs';

export default function RowRadioButtonsGroup(props: any) {
  const { bank, accountNumber } = props;
  const [selection, setSelection] = React.useState('100');
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [transferError, setTransferError] = React.useState(null);
  console.log(transferError);
  const [customAmount, setCustomAmount] = React.useState('');
  const [reference, setReference] = React.useState('');
  const to = '044033301951101';
  const transferMoney = () => {
    setIsTransferring(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const amount = selection === 'other' ? customAmount : selection;
    const raw = JSON.stringify({
      to,
      amount: parseFloat(amount),
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${APIOrigin}/banks/${bank}/${accountNumber}/trasfer`, requestOptions as any)
      .then((response) => response.json())
      .then((result) => setReference(result.reference))
      .catch((error) => {
        console.log('error', error);
        setTransferError(error);
      })
      .finally(() => {
        setIsTransferring(false);
        setSelection('100');
        setCustomAmount('');
      });
  };
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          Transfer
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Amount</FormLabel>
          <RadioGroup
            onChange={(e) => setSelection(e.target.value)}
            value={selection}
            row
            aria-label="amount"
            name="transfer-amount"
          >
            <FormControlLabel value="100" control={<Radio />} label="100" />
            <FormControlLabel value="500" control={<Radio />} label="500" />
            <FormControlLabel value="1500" control={<Radio />} label="1500" />
            <FormControlLabel value="5000" control={<Radio />} label="5000" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Box>
      {selection === 'other' && (
        <Box width="100%">
          <TextField
            fullWidth
            autoFocus
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
            }}
            id="custom-amount"
            label="Custom Amount"
            variant="outlined"
            onChange={(e) => setCustomAmount(e.target.value)}
            value={customAmount}
          />
        </Box>
      )}
      <Box alignItems="center" display="flex" sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button disabled={isTransferring} onClick={transferMoney} color="error" variant="outlined">
          Transfer
        </Button>
        {reference && (
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderRadius: '16px',
              ml: 2,
              borderColor: 'grey.500',
              fontSize: 10,
              height: 20,
              width: '50%',
              textAlign: 'center',
            }}
          >
            {reference}
          </Box>
        )}
      </Box>
      {isTransferring && <LinearProgress />}
    </>
  );
}
