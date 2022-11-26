export default {
  collection: {
    filterPlaceholder: "关键字过滤",
    newHTTPRequest: "新建HTTP请求",
    newFolder: "新建目录",
    deleteSetting: "删除配置",
    deleteSettingContent: "确认要删除配置(%s)吗？",
    modifySetting: "修改配置",
    copySetting: "复制配置",
    copySettingSuccess: "配置已成功复制至粘贴板",
    shouldSelectAPISettingFirst: "请先选择接口请求",
    send: "发送",
    abort: "中止",
    format: "格式化",
    changeContentType: "更换数据类型",
    changeContentTypeContent:
      "更换数据类型后原有的数据会清除，请确认是否要更换？",
    namePlaceholder: "名称",
    valuePlaceholder: "值",
    requesting: "请求中...",
    copyAsCURL: "复制为curl",
    copyAsCURLSuccess: "curl已成功复制至粘贴板",
    pinRequest: "置顶请求",
    importSettings: "导入配置",
    importSuccess: "已经成功导入配置",
    exportSettings: "导出配置",
    dragUploadTips: "点击或拖动文件至此区域上传",
    importFromJSONFile: "导入CyberAPI的配置",
    exportSettingsSuccess: "配置已成功导出至下载目录",
    curlTooLargeTips: "curl数据太大，内容已复制至粘贴板",
    apiID: "该请求配置ID",
    remoteAddr: "请求地址",
    dns: "域名解析",
    tcp: "TCP握手",
    tls: "TLS握手",
    cipher: "密码套件",
    serverProcessing: "服务器处理",
    contentTransfer: "数据传输",
  },
  common: {
    app: "CyberAPI",
    dashboard: "面板",
    add: "添加",
    confirm: "确定",
    back: "返回",

    name: "名称",
    nameRequireError: "名称不能为空",
    namePlaceholder: "请输入名称",

    description: "描述",
    descriptionPlaceholder: "请输入描述内容",

    modify: "修改",

    loading: "加载中...",
    delete: "删除",
    duplicate: "复制",
    settings: "设置",
    create: "创建",
    keywordFilterPlaceholder: "请输入关键字",
    saveToDownloadSuccess: "文件已成功保存至下载目录",
  },
  dashboard: {
    newCollection: "创建API分组",
    updateCollection: "更新API分组",
    deleteCollection: "删除API分组",
    deleteCollectionContent: "确认要删除API分组吗？删除后无法恢复！",
    deleteCollectionDone: "已成功删除该API分组",
    sortLastModified: "更新时间",
    sortNameAsc: "名称升序",
    sortNameDesc: "名称降序",
    sortOlderFirst: "旧的在前",
    sortNewestFirst: "新的在前",
  },
  setting: {
    title: "应用设置",
    themeTitle: "请选择应用的配色主题",
    darkTheme: "深色主题",
    lightTheme: "浅色主题",
    systemTheme: "系统主题",
    infoTitle: "应用信息",
    appVersion: "版本",
    platform: "平台",
    arch: "架构",
    os: "系统",
    dir: "应用目录",
    osVersion: "系统版本",
    windowSize: "应用窗口设置",
    windowWidth: "窗口宽度",
    windowResizeType: "窗口大小类型",
    windowMaxSize: "最大化",
    windowCustomSize: "自定义",
    windowWidthPlaceholder: "输入窗口宽度",
    windowHeight: "窗口高度",
    windowHeightPlaceholder: "输入窗口高度",
    cookieSetting: "Cookie设置",
    storeSetting: "存储设置",
    appSetting: "应用设置",
    envSetting: "环境变量设置",
    reqHeaderSetting: "请求头设置",
    exportTables: "数据备份",
    exportTablesProcessing: "数据正在备份中，请稍候...",
    exportTablesSuccess: "数据成功备份至下载目录：%s",
    importTables: "数据导入",
    importTablesTips: "导入数据会先清空原有数据，确认是否导入？",
    importTablesSuccess: "数据已成功导入，应用将在3秒后重启",
    customizeVariableSetting: "变量设置",
    langChangeSuccess: "修改语言配置成功，应用将在3秒后重启",
    browser: "浏览器",
    timeoutSetting: "请求超时设置",
    timeoutConnect: "连接超时(秒)",
    timeoutRead: "读超时(秒)",
    timeoutWrite: "写超时(秒)",
  },
  cookie: {
    title: "Cookie设置",
    name: "名称",
    namePlaceholder: "请输入cookie的名称",
    value: "值",
    valuePlaceholder: "请输入cookie的值",
    path: "路径",
    pathPlaceholder: "请输入cookie的路径",
    domain: "域名",
    domainPlaceholder: "请输入cookie的域名",
    expires: "有效期",
    expiresPlaceholder: "请选择cookie有效期",
    op: "操作",
    deleteCookie: "删除Cookie",
    deleteCookieContent: "确认要删除Cookie吗？",
    neverExpired: "永久有效",
    clearCookieTips: "请确认是否清除所有的Cookie？",
    clearCookie: "清除Cookie",
  },
  environment: {
    title: "环境变量设置",
    tips: "使用当前各环境变量，方便不同环境的切换(仅用于当前项目)",
    uriIsNil: "请求地址不能为空",
    addNew: "添加环境变量",
    clearCurrent: "清除当前值",
  },
  customizeVariable: {
    title: "自定义变量",
    tips: "自定义变量，可存储常用的变量值，通过value函数获取变量值(仅用于当前项目)",
  },
  globalReqHeader: {
    title: "HTTP请求头",
    tips: "自定义的HTTP请求头，用于全局添加至所有请求(仅用于当前项目)",
  },
  store: {
    title: "应用相关存储",
    name: "存储",
    desc: "描述",
    op: "操作",
    settingStore: "应用配置",
    settingStoreDesc: "保存应用窗口、主题等配置信息",
    pinRequestsStore: "置顶配置",
    pinRequestsStoreDesc: "保存置顶的相关请求信息",
    latestResponseStore: "请求响应",
    latestResponseStoreDesc: "保存最新的请求响应",
    clearTips: "确认清除(%s)的所有数据吗？清除后无法恢复！",
    clearSuccess: "存储数据已清除，应用将在3秒后重启",
    noHistory: "该请求无历史响应记录",
    responseList: "响应记录",
    clearHistory: "清除历史响应",
    clearHistorySuccess: "已成功清除历史响应",
  },
};
