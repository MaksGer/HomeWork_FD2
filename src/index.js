import AppService from './modules/app.service'
import {config} from './modules/config'
import './modules/header.component'
import './css/index.css'
import './less/index.less'
import './modules/ts.module'

console.log('Config key:',config.key);
const service = new AppService('hello');
service.log();