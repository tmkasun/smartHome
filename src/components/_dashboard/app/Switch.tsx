import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import bulbOutlined from '@iconify/icons-ant-design/bulb-outlined';
import bulbFilled from '@iconify/icons-ant-design/bulb-filled';
import acUnitIcon from '@iconify/icons-ic/baseline-ac-unit';
// material
import Tooltip from '@mui/material/Tooltip';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Card, Typography } from '@mui/material';
// custom

import { BorderLinearProgress, FacebookCircularProgress } from './components/SignalStrength';

// ----------------------------------------------------------------------

const MIN = -90; // Minimum expected value
const MAX = -30; // Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

export default function Switch(props: { switchId: string; switchName: string }) {
  const { switchId, switchName } = props;
  const [switchInfo, setSwitchInfo] = useState(null);
  const [isLoading, setIsLoading] = useState<undefined | boolean>();
  const [error, setError] = useState(null);
  const {
    seq: { data = {} },
  }: { seq: { data: any } } = switchInfo || { seq: { data: {} } };
  const isOn = data.switch === 'on';

  const handleOnClick = (state: any) => {
    setIsLoading(true);
    let newIsOn = false;
    const nextSwitchState = { ...(switchInfo as any) };
    if (state === 'off') {
      newIsOn = true;
      nextSwitchState.seq.data.switch = 'on';
    } else {
      nextSwitchState.seq.data.switch = 'off';
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      isOn: newIsOn,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`https://home.knnect.com/apis/switches/${switchId}/state`, requestOptions as any).finally(
      () => setIsLoading(false),
    );
    setSwitchInfo(nextSwitchState);
  };
  const fetchData = () => {
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`https://home.knnect.com/apis/switches/${switchId}`, requestOptions as any)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((r) => {
        setSwitchInfo(r);
      })
      .catch((er) => {
        console.log('error', er);
        setError(er);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(fetchData, [switchId]);
  let icon;
  if (switchName === 'ac') {
    icon = acUnitIcon;
  } else {
    icon = isOn ? bulbFilled : bulbOutlined;
  }
  console.log(data);
  return (
    <RootStyle>
      <Button
        onClick={() => {
          handleOnClick(data.switch);
        }}
        sx={{
          margin: 'auto',
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          width: 10,
          height: 10,
          backgroundColor: isOn ? 'white' : 'inherit',
          boxShadow: isOn ? '0px 0px 40px 20px #fff' : 'none',
          justifyContent: 'center',
          marginBottom: 3,
          color: 'primary.dark',
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
              theme.palette.primary.dark,
              0.24,
            )} 100%)`,
        }}
      >
        {isLoading ? (
          <FacebookCircularProgress />
        ) : (
          <Icon
            style={{ color: isOn ? '#f2ffe0' : 'inherit' }}
            icon={icon}
            width={54}
            height={54}
          />
        )}
      </Button>
      <Typography
        sx={{
          textTransform: 'capitalize',
        }}
        variant="h3"
      >
        {switchName}
      </Typography>
      <Tooltip title={`Signal strength (${data.signalStrength})`}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <BorderLinearProgress variant="determinate" value={normalise(data.signalStrength)} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              normalise(data.signalStrength),
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
        disabled={error as unknown as boolean}
      >
        {data.switch === 'off' ? 'On' : 'Off'}
      </LoadingButton>
    </RootStyle>
  );
}
