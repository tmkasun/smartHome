import React from 'react';
import { render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { OpenAPIBackend } from 'openapi-backend'; // https://github.com/anttiviljami/openapi-backend https://dev.to/epilot/testing-react-with-jest-and-openapi-mocks-8gc

import Switch from './Switch';

const api = new OpenAPIBackend({
  definition:
    'https://raw.githubusercontent.com/tmkasun/me_api/master/swagger_server/swagger/swagger.yaml?token=AAZJBXNZJP3KZRCESH6MLMLBLKNH2',
});

api.register('notFound', (c, res, ctx) => res(ctx.status(404)));
api.register('notImplemented', async (c, res, ctx) => {
  const { status, mock } = await api.mockResponseForOperation(
    (c.operation && c.operation.operationId) || 'NO-OP',
  );
  return res(ctx.status(status), ctx.json(mock));
});
const server = setupServer(
  rest.get('*/apis/*', async (req, res, ctx) => {
    req.path = req.url.pathname.replace('/apis', '');
    const a = await api.handleRequest(req, res, ctx);
    await new Promise((r) => setTimeout(() => r(''), 5000));
    return a;
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(() => server.close());

test('Sonoff switch default', async () => {
  render(<Switch switchId={12} switchName="testSW" />);
  screen.getByTestId('fb-progress');
  expect(
    screen.getByRole('button', {
      name: /off/i,
    }),
  ).toBeDisabled();
  await waitForElementToBeRemoved(() => screen.getByTestId('fb-progress'), { timeout: 5000000 });
  await waitFor(() =>
    screen.getByRole('heading', {
      name: /device id: 100000140e/i,
    }),
  );
  expect(
    screen.getByRole('heading', {
      name: /device id: 100000140e/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole('button', {
      name: /on/i,
    }),
  ).not.toBeDisabled();
}, 800000);
