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
import { rest } from 'msw';
import { Context, OpenAPIBackend, Request } from 'openapi-backend';
import { setupServer } from 'msw/node';
import { searchParamsToRequestQuery } from './utils';

// Declaring the global BallerinaCentral variable set from src/setupTests.ts file
declare global {
  const meAPISetup: Promise<OpenAPIBackend>;
}

// `apiContext` ideally this should be equal to the context of the API deployed in the gateway (choreo connect)
// TODO: Should get from central OAS definition URL place
export const apiContext = '*/apis/*';

type APIResponseOverride = (
  requestContext: Context,
  mock: any,
  status: number,
  response: (status: any, mock: any) => void,
  context: { status: (s: number) => void; json: (s: string) => void },
) => { mock: any; status?: number };
export const { onResponse, getOverride, resetMockHandler } = (() => {
  const defaultHandler: APIResponseOverride = (c, mock, status) => ({
    mock,
    status,
  });

  let override: APIResponseOverride = defaultHandler;
  return {
    onResponse: (overridingFunction: APIResponseOverride) => {
      override = overridingFunction;
    },
    getOverride: () => override,
    resetMockHandler: () => {
      override = defaultHandler;
    },
  };
})();
export const getMockServer = async () => {
  const api = await meAPISetup;
  // Register `notFound` handler for return 404 response, `notFound` here is a reserved handler
  // in `openapi-backend` library (https://github.com/anttiviljami/openapi-backend)
  api.register('notFound', (c, res, ctx) => res(ctx.status(404)));

  // register 'notImplemented' (special handler) in mock API
  api.register('notImplemented', async (c, res, ctx) => {
    const { status: initialStatus, mock: initialMock } = await api.mockResponseForOperation(
      c.operation.operationId || '',
    );
    const { status = initialStatus, mock } = getOverride()(c, initialMock, initialStatus, res, ctx);
    // Every valid operation (path + verb) request will go through this handler
    return res(ctx.status(status), ctx.json(mock));
  });

  // An Async function which will be passed to the `msw` library for handling intercepted incoming requests
  const mockHandler = async (
    req: { url?: any; method?: any; headers?: any },
    res: any,
    ctx: any,
  ) => {
    let mockedResponse = ctx.json({
      error: 'something went wrong',
    });
    try {
      const path = req.url.pathname.replace('/apis', '');
      const query = searchParamsToRequestQuery(req.url.searchParams);
      const { method, headers } = req;
      const oasRequest: Request = {
        path,
        method,
        headers: headers.all(),
        query,
      };

      mockedResponse = await api.handleRequest(oasRequest, res, ctx);
      // Debug at below point to see the mocked response
    } catch (error) {
      console.error(error);
    }
    return mockedResponse;
  };
  // *IMPORTANT* Should provide a unique segment in the request (ideally API context)
  // which could differentiate current API requests from others

  const mockingVerbs = [rest.get, rest.post, rest.put, rest.patch, rest.delete];
  const server = setupServer(...mockingVerbs.map((verb) => verb(apiContext, mockHandler)));
  return server;
};

export default getMockServer;
