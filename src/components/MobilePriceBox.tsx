// material
import { Box, Grid } from '@mui/material';

const MobilePriceBox = ({
  amount,
  isSelected,
  onClick,
}: {
  amount?: number;
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
      {`${amount} Rs`}
    </Box>
  </Grid>
);

export default MobilePriceBox;
