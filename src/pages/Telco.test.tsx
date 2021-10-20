import { render, waitFor } from 'test/utils';
import getMockServer, { resetMockHandler } from 'test/meAPI.mock';

import Telco from './Telco';

const serverPromised = getMockServer();
beforeAll(async () => {
  const server = await serverPromised;
  await waitFor(() => expect(server).toBeDefined());
  server.listen();
});
afterEach(async () => {
  const server = await serverPromised;
  server.resetHandlers();
  resetMockHandler();
});
afterAll(async () => {
  const server = await serverPromised;
  server.close();
});

describe('Marketplace page', () => {
  test('Marketplace get connectors', async () => {
    render(<Telco />);
  });
});
