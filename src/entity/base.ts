export interface BaseListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  categorys?: {id: string; name: string; list: string[]}[];
}
export interface BaseCategorySummary {
  [index: number]: {name: string; id: string};
}
export interface BaseListItem {
  id: string;
}
export interface BaseListSearch {
  pageCurrent?: number;
  pageSize?: number;
  term?: string;
  category?: string;
  sorterOrder?: 'ascend' | 'descend';
  sorterField?: string;
}

export type ListSearchFormData<F> = Required<Omit<F, keyof BaseListSearch>>;

export type ListView = 'list' | 'selector' | 'category' | '';
export type ItemView = 'detail' | 'edit' | 'create' | 'summary' | '';
export interface CommonResourceRouteParams<L = never, I = never> {
  listView: ListView | L;
  listSearch: BaseListSearch;
  listKey: string;
  itemView: ItemView | I;
  itemId: string;
  itemKey: string;
}

export interface CommonResource<L = never, I = never> {
  RouteParams: CommonResourceRouteParams;
  ListSearch: BaseListSearch;
  ListItem: BaseListItem;
  ListSummary: BaseListSummary;
  ListView: ListView | L;
  ItemView: ItemView | I;
  CategoryList: {[cid: string]: BaseListItem[]};
  CategorySummary: BaseCategorySummary;
  CreateItem: any;
  UpdateItem: any;
}
export interface ProjectConfig {
  tokenRenewalTime: number;
  noticeTimer: number;
}
export interface TabNav {
  id: string;
  title: string;
  url: string;
}

// export interface CategoryList<L extends BaseListItem> {
//   cid: string;
//   cname: string;
//   clist: L[];
// }
