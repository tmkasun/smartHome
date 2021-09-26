import React from 'react';
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { OpenAPIBackend } from 'openapi-backend'; // https://github.com/anttiviljami/openapi-backend https://dev.to/epilot/testing-react-with-jest-and-openapi-mocks-8gc

import Switch from './Switch';

const api = new OpenAPIBackend({
  definition: '/home/kasun/projects/smartHome/swagger.yaml',
});

api.register('notFound', (c, res, ctx) => res(ctx.status(404)));
api.register('notImplemented', async (c, res, ctx) => {
  const { status, mock } = await api.mockResponseForOperation(
    (c.operation && c.operation.operationId) || 'NO-OP',
  );
  return res(ctx.status(status), ctx.json(mock));
});
const server = setupServer(
  rest.get('https://home.knnect.com/apis/*', (req, res, ctx) => {
    // res(ctx.json({ greeting: 'hello there' }));
    req.path = req.url.pathname.replace('/apis', '');
    return api.handleRequest(req, res, ctx);
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
  await waitForElementToBeRemoved(() => screen.getByTestId('fb-progress'));
  expect(
    screen.getByRole('heading', {
      name: /device id: 10011c4ca4/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole('button', {
      name: /on/i,
    }),
  ).not.toBeDisabled();
  // screen.getByRole('heading', {
  //   name: /device id:/i,
  // });
});
