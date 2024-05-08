import { Router, routes } from './cola/router.js';
import { HomeComponent } from './components/home.js';
import { TestComponent } from './components/test.js';
import { ErrorPage } from './components/errorPage.js';
import { NavComponent } from './components/nav.js';
import { TestStore } from './components/testStore.js';
import { Count } from './components/count.js';

routes.push({ path: '/', label: 'Home', handler: () => new HomeComponent().mount(), display: true})
routes.push({ path: '/test', label: 'Test', handler: () => new TestComponent().mount(), display: true})
routes.push({ path: '/count', label: 'Count', handler: () => new Count().mount(), display: true})
routes.push({ path: '/error', label: 'Error', handler: () => new ErrorPage().mount(), display: false})

// Initialize router
const router = new Router(routes);

const navComponent = new NavComponent({routes: routes, parent: '#nav'});
const testStore = new TestStore();

// Navigate to initial route
router.loadRoute();