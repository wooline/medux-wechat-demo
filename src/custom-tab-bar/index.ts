Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'home-o',
        text: '首页',
        url: 'modules/app/views/Home/page',
      },
      {
        icon: 'flag-o',
        text: '赛事',
        url: 'modules/contest/views/Category/page',
      },
      {
        icon: 'shopping-cart-o',
        text: '商城',
        url: 'modules/shop/views/Home/page',
      },
      {
        icon: 'flower-o',
        text: '户外',
        url: 'modules/article/views/Category/page',
      },
      {
        icon: 'user-o',
        text: '我的',
        url: 'modules/my/views/Home/page',
      },
    ],
  },

  methods: {
    onChange(event) {
      global.historyActions.switchTab(this.data.list[event.detail].url).then(() => {
        this.setData({active: event.detail});
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex((item) => item.url === `${page!.route}`),
      });
    },
  },
});

export {};
