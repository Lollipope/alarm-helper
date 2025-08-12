import { default as AlarmHelper } from './views/index';
declare const version: string;
declare const install: (app: import('vue').App) => void;
export { version, install, AlarmHelper as default };
export * from './utils';
export * from './api';
export * from './audio';
export * from './comp';
