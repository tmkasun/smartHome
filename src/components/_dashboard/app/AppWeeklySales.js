import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import bulbOutlined from '@iconify/icons-ant-design/bulb-outlined';
import bulbFilled from '@iconify/icons-ant-design/bulb-filled';
// material
import Tooltip from '@material-ui/core/Tooltip';
import { alpha, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { LoadingButton } from '@material-ui/lab';
import { Card, Typography } from '@material-ui/core';
// custom

import { BorderLinearProgress, FacebookCircularProgress } from './components/SignalStrength';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: (isOn) => (isOn ? 'white' : 'inherit'),
    boxShadow: (isOn) => (isOn ? '0px 0px 40px 20px #fff' : 'none'),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`
  }
}));
// ----------------------------------------------------------------------

const MIN = -90; // Minimum expected value
const MAX = -30; // Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

export default function AppWeeklySales(props) {
  const { switchId = '4' } = props;
  const [switchInfo, setSwitchInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {
    seq: { data = {} }
  } = switchInfo || { seq: {} };
  const isOn = data.switch === 'on';
  const clasess = useStyles(isOn);

  const handleOnClick = (state) => {
    setIsLoading(true);
    let isOn = false;
    const nextSwitchState = { ...switchInfo };
    if (state === 'off') {
      isOn = true;
      nextSwitchState.seq.data.switch = 'on';
    } else {
      nextSwitchState.seq.data.switch = 'off';
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

    fetch(`https://home.knnect.com/switches/${switchId}/state`, requestOptions).finally(() =>
      setIsLoading(false)
    );
    setSwitchInfo(nextSwitchState);
  };
  const fetchData = () => {
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://home.knnect.com/switches/${switchId}`, requestOptions)
      .then((response) => response.json())
      .then(setSwitchInfo)
      .catch((error) => console.log('error', error))
      .finally(() => setIsLoading(false));
  };
  useEffect(fetchData, [switchId]);

  return (
    <RootStyle>
      <Button
        onClick={() => {
          handleOnClick(data.switch);
        }}
        className={clasess.iconWrapper}
      >
        {isLoading ? (
          <FacebookCircularProgress />
        ) : (
          <Icon
            style={{ color: isOn ? '#f2ffe0' : 'inherit' }}
            icon={isOn ? bulbFilled : bulbOutlined}
            width={54}
            height={54}
          />
        )}
      </Button>
      <Typography variant="h3">WiFi {data.signalStrength}</Typography>
      <Tooltip title="Signal strength">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <BorderLinearProgress variant="determinate" value={normalise(data.signalStrength)} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              normalise(data.signalStrength)
            )}%`}</Typography>
          </Box>
        </Box>
      </Tooltip>
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
