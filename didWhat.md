# Task 4（17/7/21）

## 完成内容

1. 简化 api*/students*接口方法 不再用字符串拼接 直接调用参数对象 使其 reusable
2. 搜索框功能 -设定搜索框的 onChange 函数 -> 函数中跳用 lodash 的 debounce 函数 -> debounce 参数是(function(){setQuery 函数}，1000) -> 执行 debounce 返回函数 -设定搜索框的 onSearch 函数 => 执行 setQuery
   ->query 的 state 值变化->执行 useEffect 里的回调函数
3. table 数据优化 useEffect 的依赖项除了分页数据 pagination 增加了搜索框的 query

## 问题

- console 报错：
  -- Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

# Task 3

## 完成内容

1. 优化了 api 设置(api 文件夹下)

2. get 请求 api"/api/students"（参数{page:1,limit:20}用 antd table 展示并实现了 manager 下 student list 页面的基本功能（分页显示，排序）

3. 自定义一个简易函数（config/menuConfig 下)，实现 dashboard 页面 left-menu 的 render

4. 修复一些小 bug

## 问题

1. 一个正在做或者已完成的 react 项目从 jsx 转化为 tsx,需要做些什么？ 可以利用什么工具来转化吗？
   _react-javascript-to-typescript-transform_ package
2. bug:当不是通过点击 left-menu，而是直接输入 url 或者其他方式跳转，左边的相应的 menu 项没有高亮显示，想办法解决。
