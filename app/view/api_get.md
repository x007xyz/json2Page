
    
**简要描述：** 

- 保存{{name}}接口

**请求URL：** 
- ` http://xx.com/api/user/{{name}}/get `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| id |true  |string | 对象id |

 **返回示例**

``` 
  {
    "code" : "000000"，
    "msg" : "错误提示"，
    "stack" : "错误栈"，
    "data": {
      {% for field in fields %}{{field.name}}:{{field.label}},
      {% endfor %}
    }
  }
```

 **返回参数说明** 



 **备注** 

- 更多返回错误代码请看首页的错误代码描述


