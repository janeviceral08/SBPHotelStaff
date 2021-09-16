import React from 'react';
import { pushNotifications } from './components/services';
import AppContainer from './components/AppContainer';

pushNotifications.configure();

export default AppContainer;