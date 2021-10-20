/* eslint-disable */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import fetch from 'isomorphic-fetch';
import OpenAPIBackend from 'openapi-backend';
// Overriding default `waitFor` timeout value due to MSW latencies
// Default asyncUtilTimeout value is 1000
// For more info refer : https://testing-library.com/docs/dom-testing-library/api-configuration/
configure({ asyncUtilTimeout: 10000 });
jest.setTimeout(30000);

global.meAPISetup = (async function () {
  console.log('\nTo be used in starting all mock servers before all tests');
  const r = await fetch(
    'https://raw.githubusercontent.com/tmkasun/me_api/master/swagger_server/swagger/swagger.yaml',
    {
      headers: {
        Authorization: `token ${process.env.gitPAT}`,
      },
    },
  );
  const definition = await r.text();
  return new OpenAPIBackend({ definition });
})();
console.log('foo');
