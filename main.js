import { Router, routes } from './cola/router.js';
import { App } from './components/app.js';
import { HomeComponent } from './components/home.js';
import { TestComponent } from './components/test.js';
import { ErrorPage } from './components/errorPage.js';
import { TestStore } from './services/testStore.js';
import { Count } from './components/count.js';
import { LoginForm } from './components/loginForm.js';

// Add routes
routes.push({ path: '/', link: '/', label: 'Home', component: new HomeComponent(), display: true })
routes.push({ path: '/test', link: '/test', label: 'Test', component: new TestComponent(), display: true })
routes.push({ path: '/login', link: '/login', label: 'Login', component: new LoginForm(), display: true })
routes.push({ path: '/count/{arg1}/{arg2}', link: '/count/test/test2', label: 'Count', component: new Count(), display: true })
routes.push({ path: '/error', link: '/error', label: 'Error', component: new ErrorPage(), display: false })

// Initialize router
const router = new Router(routes);

// Initialize app
const app = new App({parent: 'body'});

// Test store
const testStore = new TestStore();
// console.log(testStore);

// Navigate to initial route
router.handleRouteChange();