# 表单生成器说明
## 基本原理
根据json数据，使用模板引擎生成对象对应的组件
## 现有功能
1. 保存json数据
2. 根据json数据生成表单页面代码
3. 根据json数据生成表单预览页面
4. 根据json数据生成表格页面代码
5. 根据json数据生成表格预览页面

界面如图所示：
![](http://7xpitv.com1.z0.glb.clouddn.com/18-6-3/14762051.jpg)
## 总体结构
输入json数据，根据type字段的值，会被转换为不同的基础组件，type的值必须为已有的组件的名称;基本组件组合为[name]\_template.html文件，同时根据json的属性生成 [name]\_data，两者组合最终成为我们需要的文件，具体的组件与现有文件如下图：
![](http://7xpitv.com1.z0.glb.clouddn.com/18-6-3/1936770.jpg)
## json数据属性值
每一个json数据都代表一个基础组件，设置不同的属性值可以设置组件，有些属性值是所有组件都有的，有些是某些组件特有的，具体查看下图表格
![](http://7xpitv.com1.z0.glb.clouddn.com/18-6-3/82799866.jpg)
name:为字段名称，如用户名为username；
type:为组件类型，现有类型为`'text', 'password', 'textarea', 'radio', 'radio-group', 'checkbox', 'checkbox-group', 'switch', 'select', 'date', 'daterange', 'time', 'timerange', 'datetime', 'datetimerange'`，如不是其中的值将会出错。
label:为标签名
default:默认值
required:字段验证，是否是必须
message:验证提示信息
placeholder:占位符
option:选项名称
options:选项列表，为数组

## 更多功能
1. 已保存json数据查询
2. 已保存json数据编辑修改
3. 根据使用反馈优化更新
