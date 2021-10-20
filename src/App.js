import { createRef } from 'react';
import { SnackbarProvider } from 'notistack';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  // add action to all snackbars
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      hideIconVariant
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Fade}
      dense
      maxSnack={3}
      ref={notistackRef}
      action={(key) => (
        <IconButton size="large" onClick={onClickDismiss(key)}>
          <CloseIcon />
        </IconButton>
      )}
    >
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </SnackbarProvider>
  );
}
