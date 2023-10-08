/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import "./src/external/i18next/index.ts"

AppRegistry.registerComponent(appName, () => App);
