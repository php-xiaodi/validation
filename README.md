# Validaton

读取swagger的类型配置然后做校验

1 common 类型

```js
  @body({
    mobile: {
      type: 'number',
      description: '手机号',
      required: true
    },
    name: {
      type: 'string',
      description: '姓名',
      required: true
    }
})
```
moblie的类型会进行number的判定，name的类型会进行string的判定。因为required，两个参数都会进行是否存在的判定

2 值可以为空

```js
  @body({
    mobile: {
      type: 'number',
      description: '手机号',
      required: true,
      nullable: true
    }
})
```
加了nullable后，传入参数为空也可以校验通过

3 指定enum中的值

```js
  @body({
    sn: {
      type: 'number',
      description: 'sn',
      required: true,
      nullable: true,
      enum: [1231, 2491]
    }
})
```
传入的sn只能是1231或者2491

4 regex校验

```js
  @body({
    sn: {
      type: 'number',
      description: 'sn',
      required: true,
      pattern: '[\u4e00-\u9fa5]' // string为中文
    }
})
```
目前只支持type类型为string的正则校验
