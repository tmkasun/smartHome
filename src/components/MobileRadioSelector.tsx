import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const MOBITEL_REGEX = /^0\d{1}1\d{7}/;
const DIALOG_REGEX = /^0\d{1}[7,6]\d{7}/;
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
  padding: 10,
}));

export default function MobileRadioSelector(
  props: FormControlLabelProps & { mobileNumber: string },
) {
  const { mobileNumber, ...rest } = props;
  const radioGroup = useRadioGroup();
  let logo: null | string = null;
  if (MOBITEL_REGEX.test(mobileNumber as string)) {
    logo = '/static/logos/mobitel.jpg';
  } else if (DIALOG_REGEX.test(mobileNumber as string)) {
    logo = '/static/logos/dialog-axiata.jpg';
  }
  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <StyledFormControlLabel checked={checked} {...rest} />
      {logo && <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={logo} />}
    </Box>
  );
}
