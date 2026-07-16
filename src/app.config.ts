export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/message/index',
    'pages/publish/index',
    'pages/mine/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#6366f1',
    navigationBarTitleText: 'EventNest',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f8fafc'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#6366f1',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.svg',
        selectedIconPath: 'assets/tabbar/home-selected.svg'
      },
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: 'assets/tabbar/message.svg',
        selectedIconPath: 'assets/tabbar/message-selected.svg'
      },
      {
        pagePath: 'pages/publish/index',
        text: '发布',
        iconPath: 'assets/tabbar/publish.svg',
        selectedIconPath: 'assets/tabbar/publish-selected.svg'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/mine.svg',
        selectedIconPath: 'assets/tabbar/mine-selected.svg'
      }
    ]
  }
})