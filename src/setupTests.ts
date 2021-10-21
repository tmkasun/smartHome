/* eslint-disable */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import YAML from 'js-yaml';
import fetch from 'isomorphic-fetch';
import OpenAPIBackend from 'openapi-backend';

// Overriding default `waitFor` timeout value due to MSW latencies
// Default asyncUtilTimeout value is 1000
// For more info refer : https://testing-library.com/docs/dom-testing-library/api-configuration/
configure({ asyncUtilTimeout: 10000 });
jest.setTimeout(30000);

global.meAPISetup = (async function () {
  const response = await fetch(
    'https://raw.githubusercontent.com/tmkasun/me_api/master/swagger_server/swagger/swagger.yaml',
    {
      headers: {
        Authorization: `token ${process.env.gitPAT}`,
      },
    },
  );
  const definitionText = await response.text();
  const definitionJson = YAML.load(definitionText);
  return new OpenAPIBackend({ definition: definitionJson });
})();
