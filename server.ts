import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as isbot from 'isbot';
import * as path from 'path';
import { HOST_URL } from './src/app/capcar/tokens/host-url';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/meta-tags/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  isbot.extend(['Mozilla/5.0 (compatible; vkShare; +http://vk.com/dev/Share)', 'PostmanRuntime/7.25.0']);

  // ......................
    
  // Check whether app is accessed by a bot;
  // If bot - return as SSR;
  // otherwise return as SPA;
  server.get('*', (req: express.Request, res: express.Response) => {

    // url where the app is hosted (e.g. https://app-domain.com/);
    // will be useful for generating meta tags;
    const hostUrl = req.protocol + '://' + req.get('Host');

    // check whether User-Agent is bot
    if (isbot(req.header('User-Agent'))) {
      console.log('SSR');
      // render app page on the server
      res.render(indexHtml, { req, providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
        
          // HOST_URL will become available
          // in Angular DI system on the server
          { provide: HOST_URL, useValue: hostUrl },
      ] });
    } else {
      console.log('No SSR');
      // return index.html without pre-rendering
      // app will get rendered on the client
      res.sendFile(path.join(__dirname, '../browser/index.html'));
    }
  });

  return server;
}