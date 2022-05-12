import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { BugsnagService } from './bugsnag.service';

@Injectable()
export class BugsnagLogger extends Logger implements LoggerService {
  constructor(private bugsnagService: BugsnagService) {
    super();
  }

  log(message: string, context?: string) {
    // add your tailored logic here
    super.error(message);
  }

  error(message: string, trace?: string, context?: string) {
    // add your tailored logic here
    this.bugsnagService.instance.notify(new Error(message), function (event) {
      event.addMetadata('instance', {
        level: 'error',
        trace: trace,
        context: context,
      });
    });
    super.error(message, trace);
  }

  debug(message: string, context?: string) {
    // add your tailored logic here
    super.error(message);
  }

  verbose(message: string, context?: string) {
    // add your tailored logic here
    super.error(message);
  }
}

// const debug = require('debug')('main.ts')
// debug('serviceAccount %s', serviceAccount)

// const winston = require('winston');
// winston.log('info', 'serviceAccount', serviceAccount);
