// material
import { Box, Grid } from '@mui/material';

const MobilePriceBox = ({
  amount,
  isSelected,
  onClick,
  packageName,
}: {
  amount?: number;
  packageName?: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <Grid item>
    <Box
      sx={{
        boxShadow: isSelected ? 2 : 0,
        border: isSelected ? 2 : 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        borderColor: isSelected ? 'primary.main' : 'grey.500',
        cursor: 'pointer',
        textAlign: 'center',
      }}
      onClick={onClick}
    >
      <Box>{`${amount} Rs`}</Box>
      <Box color="text.secondary">{packageName}</Box>
    </Box>
  </Grid>
);

export default MobilePriceBox;
