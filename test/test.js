

import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import {join} from 'path';
import {expect} from 'chai';
import spectralCore from '@stoplight/spectral-core';
const {Document, Ruleset, Spectral} = spectralCore;
import Parsers from '@stoplight/spectral-parsers';
import {bundleAndLoadRuleset} from '@stoplight/spectral-ruleset-bundler/with-loader';
import spectralRunTime from '@stoplight/spectral-runtime';
const {fetch} = spectralRunTime;
import {JSONPath} from 'jsonpath-plus';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULESET_FILE = path.join(__dirname, '../rules/jsonapi-content-negotiation-clients.yaml');


describe('jsonapi-content-negotiation-clients ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  it('the rule should return "request-content-type" errors if request content-type is not JSON:API', function (done) {

    const badDocument = new Document(`
              openapi: 3.0.2
              paths:
                /junk:
                  patch:
                    requestBody:
                      content:
                        application/vnd.api+json:
                          schema:
                            type: string
                        application/json:
                          schema:
                            type: string
          `, Parsers.Yaml);

    return spectral.run(badDocument)
      .then((results) => {

        console.log(results);
        done();

      });

  });

});
