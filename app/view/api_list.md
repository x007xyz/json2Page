
    
**简要描述：** 

- 获取{{name}}列表接口

**请求URL：** 
- ` http://xx.com/api/user/register/list `
  
**请求方式：**
- POST 

**参数：** 
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|page |是  |number |当前页面所在页码，从1开始计算，即第一页为1   |
|rows |是  |number | 每页显示信息数量   |
{% for field in fields %}|{{field.name}} |{{field.required}}  |string |{{field.label}}   |
{% endfor %}

 **返回示例**

``` 
  {
    "code" : "000000"，
    "msg" : "错误提示"，
    "stack" : "错误栈"，
    "data": {
      "total": 20,
      "page": 1,
      "row": 10,
      "list": [{
{% for field in fields %}        {{field.name}}:{{field.label}},
{% endfor %}
      }]
    }
  }
```

 **返回参数说明** 
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|total |是  |number |总数   |
|page |是  |number |当前页面所在页码，从1开始计算，即第一页为1   |
|rows |是  |number | 每页显示信息数量   |
{% for field in fields %}|{{field.name}} |{{field.required}}  |string |{{field.label}}   |
{% endfor %}


 **备注** 

- 更多返回错误代码请看首页的错误代码描述


