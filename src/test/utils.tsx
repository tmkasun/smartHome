/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { IconButton } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import ThemeConfig from 'theme';
import CloseIcon from '@mui/icons-material/Close';

const GlobalProviders: FC = ({ children }) => (
  <HelmetProvider>
    <Router>
      <SnackbarProvider
        hideIconVariant
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        dense
        maxSnack={3}
        ref={{ current: null }}
        action={() => (
          <IconButton size="large" onClick={() => {}}>
            <CloseIcon />
          </IconButton>
        )}
      >
        <ThemeConfig>{children}</ThemeConfig>
      </SnackbarProvider>
    </Router>
  </HelmetProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: GlobalProviders, ...options });

export const searchParamsToRequestQuery = (searchParams: URLSearchParams) => {
  const queries = searchParams.toString();
  if (!queries) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURI(searchParams.toString())
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );
};

export * from '@testing-library/react';
export { customRender as render };
