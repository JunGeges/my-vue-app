### vue-provider cli插件官方文档
[https://docs.cloudbase.net/cloudbase-vue/introduce](https://docs.cloudbase.net/cloudbase-vue/introduce)

```
npm install --save @cloudbase/vue-provider
```
### cloudbase/js-sdk
```
npm install --save @cloudbase/js-sdk
```

### CloudBase cli 通过终端,用于帮助用户快速、方便的部署项目，管理云开发资源。
```
npm i -g @cloudbase/cli
```
[https://docs.cloudbase.net/cli-v1/intro](控制台脚手架文档介绍链接)

### 云开发官方网站
[https://docs.cloudbase.net/](官方)

### 数据计算 （手续费，托管费啥的都不用管了,录入数据已经处理过了）
`当日收益 = 申购份额*（今日净值-昨日净值）`

`持有收益 = （买入时净值-当前净值）*申购份额`

`持有收益率 = 持有收益/初始持仓金额（成本价*申购份额）`

`持仓金额 = 初始持仓金额（成本价*申购份额）- 持有收益`

`持仓占比 = 持仓金额/持仓总金额`

<!-- 批量获取基金 -->
https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=50&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=Wap&Fcodes=011103%2C011102%2C161032

<!-- 获取近20天净值 -->
https://fundmobapi.eastmoney.com/FundMApi/FundNetDiagram.ashx?FCODE=011103&RANGE="y"&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=1640078754203
