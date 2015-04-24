# PlanDesigner
a single page application base angular for design your plan in whole day

##简介
 - 一个单页应用
 - 基于Angular框架
 - 使用Bootstrap框架
 - 通过Gulp管理项目
 - 暂时无数据库无路由


##实现功能
 - 一个实时更新的时间
 - 一个实时刷新的时间列表，根据当前时间生成，如果起始时间被选，那么会从选择列表中删除，如果计划被删除，那么起始时间会恢复到选择列表中
 - 基本判空验证
 - 用户可以发布自己的计划
 - 一个显示用户发布计划的计划墙
 - 可以从计划墙上删除未执行的计划
 - 系统实时判定计划是否执行及是否可以删除


简易demo，可以扩展
thanks a lot 

###演示地址：[PlanDesigner](http://qianjiahao.github.io/PlanDesigner/)

####觉得还凑合的话，记得star哦~

> 4月22日
> 重构了js代码，重构项目结构，添加了js注释

> 4月23日
> [fix bug] : 错误的提取designedTimeList的index，导致plan的cancel按钮状态异常 [已解决];
>[add icon]

> 4月24日
> [standardization]依据Angular规范，规范化代码。
