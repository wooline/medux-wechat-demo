const crypto = require('crypto');
const mockjs = require('mockjs');
const timestamp = Date.now();
const headers = {
  'x-delay': 0,
  'content-type': 'application/json; charset=utf-8',
};

function createMap(obj = {}, len = 50, prot) {
  if (prot === undefined) {
    prot = Object.keys(obj).length;
  }
  let protKeys = Object.keys(obj);
  protKeys.length = prot;
  protKeys = protKeys.reduce((pre, cur) => {
    pre[cur] = true;
    return pre;
  }, {});
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      if (protKeys[key]) {
        return false;
      }
      const result = Reflect.set(target, key, value, receiver);
      const keys = Object.keys(target);
      if (keys.length > len) {
        Reflect.deleteProperty(target, keys[prot]);
      }
      return result;
    },
    deleteProperty: function (target, key) {
      if (protKeys[key]) {
        return false;
      }
      delete target[key];
      return true;
    },
  });
}

function createArray(arr = [], len = 50, prot) {
  if (prot === undefined) {
    prot = arr.length;
  }
  return new Proxy(arr, {
    get: function (target, key, receiver) {
      switch (key) {
        case 'push':
          return (...args) => {
            target.push(...args);
            const splcie = target.length - len;
            if (splcie > 0) {
              target.splice(prot, splcie);
            }
            return target.length;
          };
          break;
        case 'unshift':
          return (...args) => {
            target.splice(prot, 0, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
        case 'splice':
          return (start, ...args) => {
            target.splice(prot + start, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
      }
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      const index = Number(key);
      if (!isNaN(index)) {
        if (index < prot) {
          return true;
        }
        if (index > len - 1) {
          key = len - 1;
        }
      } else if (key === 'length') {
        if (value > len) {
          value = len;
        }
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}

function createUsers() {
  const list = createMap({
    superadmin: {
      id: 'superadmin',
      username: 'superadmin',
      nickname: '张三',
      password: '123456',
      hasLogin: true,
      gender: 'unknow',
      post: 2,
      roleId: '1',
      roleName: '超级管理员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'wooline@qq.com',
      avatar: '/client/imgs/u1.jpg',
      fixed: true,
    },
    admin: {
      id: 'admin',
      username: 'admin',
      nickname: '李四',
      password: '123456',
      hasLogin: true,
      gender: 'unknow',
      post: 1,
      roleId: '2',
      roleName: '普通管理员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'abcde@qq.com',
      avatar: '/client/imgs/u1.jpg',
      fixed: true,
    },
    editor: {
      id: 'editor',
      username: 'editor',
      nickname: '莉莉',
      password: '123456',
      hasLogin: true,
      gender: 'female',
      post: 0,
      roleId: '3',
      roleName: '信息编辑',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'revvc@sina.com.cn',
      fixed: true,
    },
    editor2: {
      id: 'editor2',
      username: 'editor2',
      nickname: '张小明',
      password: '123456',
      hasLogin: true,
      gender: 'female',
      post: 0,
      roleId: '3',
      roleName: '信息编辑',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: '5564@sina.com.cn',
      fixed: true,
    },
    member: {
      id: 'member',
      username: 'member',
      nickname: '小明',
      password: '123456',
      hasLogin: true,
      gender: 'female',
      post: 2,
      roleId: '4',
      roleName: '普通会员',
      status: 'enable',
      loginTime: timestamp,
      createdTime: timestamp,
      email: 'xiaomin@qq.com',
      fixed: true,
    },
  });
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 1,
          username: '@last',
          nickname: '@cname',
          password: '123456',
          hasLogin: true,
          'gender|1': ['male', 'female', 'unknow'],
          post: 0,
          roleId: '4',
          roleName: '普通会员',
          'status|1': ['enable', 'disable', 'enable'],
          loginTime: timestamp,
          createdTime: timestamp,
          avatar: '/client/imgs/u1.jpg',
          email: '@email',
        },
      ],
    })
    .list.forEach((item) => {
      item.loginTime = item.createdTime = timestamp + item.id * 1000;
      item.id = item.username = item.username + item.id;
      list[item.id] = item;
    });
  return list;
}

function createPosts() {
  const list = createMap({
    1: {
      id: '1',
      title: '转让二手电脑一台',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'superadmin', name: '张三'},
      editors: [{id: 'editor', name: '莉莉'}],
      createdTime: timestamp,
      status: 'resolved',
      fixed: true,
    },
    2: {
      id: '2',
      title: '张家界五日游',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'superadmin', name: '张三'},
      editors: [{id: 'editor2', name: '张小明'}],
      createdTime: timestamp,
      status: 'resolved',
      fixed: true,
    },
    3: {
      id: '3',
      title: '走遍美利坚合众国',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'admin', name: '李四'},
      editors: [
        {id: 'editor', name: '莉莉'},
        {id: 'editor2', name: '张小明'},
      ],
      createdTime: timestamp,
      status: 'resolved',
      fixed: true,
    },
    4: {
      id: '4',
      title: '中后台产品以效率为第一优先级',
      content: mockjs.Random.cparagraph(1, 3),
      author: {id: 'member', name: '小明'},
      editors: [
        {id: 'editor', name: '莉莉'},
        {id: 'editor2', name: '张小明'},
      ],
      createdTime: timestamp,
      status: 'resolved',
      fixed: true,
    },
  });
  list[5] = {
    id: '5',
    title: '感谢在此期间每一位提供反馈、建议以及贡献的人',
    content: mockjs.Random.cparagraph(1, 3),
    author: {id: 'member', name: '小明'},
    editors: [{id: 'editor2', name: '张小明'}],
    createdTime: timestamp,
    status: 'resolved',
  };
  return list;
}
const data = {
  config: {
    startupPage: {linkUrl: 'aaa', imageUrl: '', times: 9},
  },
  users: createUsers(),
  posts: createPosts(),
};

const database = {
  data,
  action: {
    users: {
      createToken(userId, expired) {
        const version = data.config.version;
        const curUser = data.users[userId];
        const digestData = [userId, curUser.password, expired, version].join(',');
        const md5 = crypto.createHash('md5');
        const digest = md5.update(digestData).digest('hex');
        const tokenData = {expired, userId, version, digest};
        const tokenStr = JSON.stringify(tokenData);
        const token = new Buffer(tokenStr).toString('base64');
        return token;
      },
      verifyToken(token) {
        if (token) {
          try {
            token = new Buffer(token, 'base64').toString();
            token = JSON.parse(token || '{}');
          } catch (e) {
            token = {};
          }
          const {expired, userId, version, digest} = token;
          if (expired && data.users[userId] && version === data.config.version && digest) {
            const since = Date.now() - expired;
            if (since < 0) {
              const curUser = data.users[userId];
              const digestData = [userId, curUser.password, expired, version].join(',');
              const md5 = crypto.createHash('md5');
              const digestStr = md5.update(digestData).digest('hex');
              if (digestStr === digest) {
                return {
                  statusCode: 200,
                  headers,
                  response: {...curUser},
                };
              }
            } else if (since < data.config.tokenRenewalTime) {
              return {
                statusCode: 402,
                headers,
                response: expired.toString(),
              };
            }
          }
        }
        return {
          statusCode: 401,
          headers,
          response: '',
        };
      },
    },
  },
};

return database;
