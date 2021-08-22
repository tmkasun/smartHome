import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
  const [switchInfo, setSwitchInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const handleOnClick = (state) => {
    let isOn = false;
    const nextSwitchState = { ...switchInfo };
    if (state === 'off') {
      isOn = true;
      nextSwitchState.seq.data.switch = 'on';
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      isOn
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('https://home.knnect.com/switches/2/state', requestOptions);
    setSwitchInfo(nextSwitchState);
  };
  const fetchData = () => {
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch('https://home.knnect.com/switches/2', requestOptions)
      .then((response) => response.json())
      .then(setSwitchInfo)
      .catch((error) => console.log('error', error))
      .finally(() => setIsLoading(false));
  };
  useEffect(fetchData, []);
  if (isLoading || !switchInfo) {
    return null;
  }
  const {
    seq: { data }
  } = switchInfo;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">WiFi {data.signalStrength}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Startup: {data.startup}
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Device ID: {data.deviceid}
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Puls: {data.pulse}
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        switch: {data.switch}
      </Typography>
      <LoadingButton
        onClick={() => {
          handleOnClick(data.switch);
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        {data.switch === 'off' ? 'On' : 'Off'}
      </LoadingButton>
    </RootStyle>
  );
}
