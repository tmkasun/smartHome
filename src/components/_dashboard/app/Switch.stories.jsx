import React from 'react';
import { rest } from 'msw';
import { OpenAPIBackend } from 'openapi-backend'; // https://github.com/anttiviljami/openapi-backend https://dev.to/epilot/testing-react-with-jest-and-openapi-mocks-8gc
import Switch from './Switch';

const api = new OpenAPIBackend({
  definition:
    'https://raw.githubusercontent.com/tmkasun/me_api/master/swagger_server/swagger/swagger.yaml?token=AAZJBXIO6CT5SXQQPQJJSMTBLH3JC',
});

api.register('notFound', (c, res, ctx) => res(ctx.status(404)));
api.register('notImplemented', async (c, res, ctx) => {
  const { status, mock } = await api.mockResponseForOperation(
    (c.operation && c.operation.operationId) || 'NO-OP',
  );
  return res(ctx.status(status), ctx.json(mock));
});

export default {
  component: Switch,
  title: 'Switch',
};

const Template = (args) => <Switch {...args} />;

/**
 * ok this is testing
 */
export const Default = Template.bind({});

Default.parameters = {
  msw: [
    rest.get('*/apis/*', (req, res, ctx) => {
      req.path = req.url.pathname.replace('/apis', '');
      return api.handleRequest(req, res, ctx);
    }),
  ],
};

Default.args = {
  switchId: '12',
  switchName: 'kasunTest',
};

// This is sample doc
