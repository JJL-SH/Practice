import Home from './page/home';
import Page404 from './page/page404';

module.exports = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '*',
    exact: false,
    component: Page404
  }
]