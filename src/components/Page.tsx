import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = '' }: { title: string; children: React.ReactNode }, ref) => (
    <Box height="100%" display="flex" alignItems="stretch" ref={ref}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  ),
);
export default Page;
