import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { APIOrigin } from 'utils/configs';

import BankTransfer from './BankTransfer';

export default function BankCard(props: any) {
  const { accountNumber, name, user } = props;
  const [account, setAccount] = useState<null | any>(null);
  const [showAmount, setShowAmount] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<any | null>(null);
  // https://ef982b46-069d-44d2-abf3-36d755a962bd.mock.pstmn.io
  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    fetch(`${APIOrigin}/banks/${name}/${accountNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(setAccount)
      .catch((e) => {
        console.log('error', e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    if (showAmount) {
      fetchData();
    }
  }, [showAmount]);
  const amountView = showAmount ? (
    <Chip
      variant="outlined"
      color="info"
      size="small"
      sx={{ width: 180 }}
      label={account && account.amount}
    />
  ) : (
    <Button
      onClick={() => setShowAmount(true)}
      color="secondary"
      fullWidth
      size="small"
      variant="outlined"
    >
      Show
    </Button>
  );
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 2,
        borderRadius: 1,
        p: 1,
        minWidth: 300,
      }}
    >
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {user}
              <IconButton
                disabled={isLoading || !showAmount}
                onClick={fetchData}
                size="large"
                aria-label="fingerprint"
                color="secondary"
              >
                <RefreshIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <Typography color="text.secondary" variant="body2">
                {accountNumber}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ display: 'flex' }} gutterBottom variant="h6" component="div">
              {isLoading ? <Skeleton width={180} /> : amountView}
              <Box component="span" sx={{ ml: 2 }}>
                .Rs
              </Box>
            </Typography>
            <Box sx={{ bgcolor: 'error.main' }}>
              {error !== null && <Box color="error">{error.message}</Box>}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {accountNumber === '060013287643127' && (
        <>
          <Divider variant="middle" />
          <BankTransfer accountNumber={accountNumber} bank={name} />
        </>
      )}
    </Box>
  );
}
