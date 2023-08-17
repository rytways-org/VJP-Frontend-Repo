import React from 'react';

const Modules = React.lazy(() => import('./pages/Modules/Modules'));

const routes = [
    //{ path: '/', exact: true, name: 'Home' },
    //{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/modules', exact: true, name: 'Modules', component: Modules },
    ]

export default routes;
