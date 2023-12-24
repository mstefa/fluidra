import express from 'express';
import * as http from 'http';

import { Logger } from '../../../src/shared/infrastructure/logger/Logger';

export default class MockServer {

  private port: number;
  private express: express.Express;
  private httpServer?: http.Server;

  constructor(port: number) {

    this.port = port;
    this.express = express();
    this.express.use(express.json());


    this.express.get('/book/:id', (req, res) => {

      Logger.info('MOCK SERVER: getting a request on /book/:id')

      const bookId = req.params.id as unknown

      if (bookId === "ERROR500") {
        Logger.info('MOCK SERVER: Responding Error 400')
        res.status(400).send('Error 400: Bad Request');
      }

      if (bookId === "ERROR400") {
        Logger.info('MOCK SERVER: Responding Error 500')
        res.status(500).send('Error 500: Internal Server Error');
      }

      const response = {
        id: bookId,
        title: 'book title',
        author: 'book author',
        year: 2000
      }
      Logger.info('MOCK SERVER: Responding Successfully...')
      res.json(response);
    });

    this.express.get('/books', (req, res) => {

      const response = [{
        id: "1001",
        title: 'book title1',
        author: 'book author1',
        year: 2000
      },
      {
        id: "1002",
        title: 'book title2',
        author: 'book author2',
        year: 2002
      }]

      res.json(response);
    });
  }

  async start(): Promise<void> {

    this.httpServer = await this.express.listen(this.port, () => {
      Logger.info(`  MOCK SERVER is running at http://localhost:${this.port}`);
    });

    return;
  }

  async stop(): Promise<void> {

    return new Promise((resolve, reject) => {
      Logger.info('  stopping http server... \n');
      if (this.httpServer) {
        this.httpServer.close((error: unknown) => {
          if (error) {
            Logger.error(error);

            return reject(error);
          }
          Logger.info('  Server stopped \n');

          return resolve();
        });
      }
    });
  }

}



