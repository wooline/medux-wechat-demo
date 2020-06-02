import {RouteParams} from '~/entity/contest';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    term: 'abcde',
  },
  listView: '',
  _listKey: '',
  itemId: '',
  itemView: '',
  _itemKey: '',
};
export default defaultRouteParams;
