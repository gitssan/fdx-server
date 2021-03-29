/* istanbul ignore file */

import { Injectable } from '@nestjs/common';
import { environment } from './environment';

@Injectable()
export class AppService {

  constructor() {}

  valideUserModel() {
    
  }

  getAppInfo(): string {
    return `FDX<br>v${process.env.npm_package_version}<br>${process.env.DEPLOY}<br>${environment.timestamp}`;
  }
}
