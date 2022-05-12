import Bugsnag from '@bugsnag/js';
import { Injectable } from '@nestjs/common';

import { BugsnagClient, BugsnagModuleOptions } from './bugsnag.interfaces';
import { NestExpressApplication } from '@nestjs/platform-express';

@Injectable()
export class BugsnagService {
  private _option;

  private readonly _instance: BugsnagClient;

  constructor(options: BugsnagModuleOptions) {
    this._option = options;
    if (!this._instance) {
      this._instance = Bugsnag.start(options);
    }
  }

  handleAnyErrors(app: NestExpressApplication | any): any {
    if (!this._instance) {
      console.log('Bugsnag not started');
      return;
    }
    let middleware = Bugsnag.getPlugin('express');

    // This must be the first piece of middleware in the stack.
    // It can only capture errors in downstream middleware
    app.use(middleware.requestHandler);

    /* all other middleware and application routes go here */

    // This handles any errors that Express catches
    app.use(middleware.errorHandler);
  }

  get instance(): BugsnagClient {
    return this._instance;
  }
}
