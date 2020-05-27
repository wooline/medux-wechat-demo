// 将某些常用变量提升至global，对全局变量有洁癖者可忽略此文件

import {actions, moduleNames} from './modules/export';

import {metaKeys} from './common/meta';

type Actions = typeof actions;
type MetaKeys = typeof metaKeys;

type EnumModuleNames = typeof moduleNames;

declare global {
  type BrowserRouter = import('./modules/export').BrowserRouter;
  type RootState = import('./modules/export').RootState;
  type RouteViews = import('./modules/export').RouteViews;
  type RouteData = RootState['route']['data'];
  type BaseRouteData = import('@medux/wechat').RouteData;
  type CommonErrorCode = import('./common/meta').CommonErrorCode;
  type DispatchProp = import('@medux/wechat').DispatchProp;

  interface ENV {
    actions: Actions;
    moduleNames: EnumModuleNames;
    metaKeys: MetaKeys;
    historyActions: BrowserRouter['historyActions'];
    toUrl: BrowserRouter['toUrl'];
    transformRoute: BrowserRouter['transformRoute'];
  }
  const global: ENV;
}

global.actions = actions;
global.moduleNames = moduleNames;