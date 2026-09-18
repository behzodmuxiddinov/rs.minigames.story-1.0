import { App } from './app/app';
import './style.scss';

const app = document.createElement('div');
app.id = 'app';
document.body.innerHTML = App();
