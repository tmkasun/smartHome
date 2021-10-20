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
// import React, { FC, ReactElement } from 'react';
// import { render, RenderOptions } from '@testing-library/react';
// import { IntlProvider } from 'react-intl';
// import { ThemeProvider } from '@material-ui/core/styles';
// import { BrowserRouter as Router } from 'react-router-dom';

// import useCreateChoreoTheme from 'theme/Theme';

// const GlobalProviders: FC = ({ children }) => {
//   const theme = useCreateChoreoTheme();
//   return (
//     <Router>
//       <IntlProvider locale="en" messages={{}}>
//         <ThemeProvider theme={theme}>{children}</ThemeProvider>
//       </IntlProvider>
//     </Router>
//   );
// };

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: GlobalProviders, ...options });

export const searchParamsToRequestQuery = (searchParams: URLSearchParams) =>
  JSON.parse(
    `{"${decodeURI(searchParams.toString())
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );

export * from '@testing-library/react';
// export { customRender as render };
