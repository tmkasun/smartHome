import React from 'react'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' }
}

const theme = createTheme({
    status: {
      danger: 'red',
    },
  });

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    )
]