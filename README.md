# wrote Login page - sign in form

# Task 7

## 实现 sideBar

- 建立 sideMenu 的数据原型
- 根据用户 role 找到相应的 sideBar 的数据
- 将 sideBar 的链接项的 key 改为和路由路径一致（唯一性）
- 根据路由 pathname 得到 defaultSelectedKeys, defaultOpenKeys,然后赋值给 Menu 组件的 props
- 在 Menu 内，map 产生<Menu.Item>（用到递归）

### 函数 getMenuConfig

- 裁剪当前路由路径，在最后是 detail 页面的情况下
- 搜索当前 active 在 menu 中的 record
- 从 record 里得到 defaultSelectedKeys, defaultOpenKeys

## 实现动态 breadCrumb

- 根据当前路由路径确定它在 menu 中的 search record
- record 中 item 的属性 hideLinkInBreadcrumb 来决定是否可以链接
- 末端的 breadcrumb 不可链接

# 问题 bug:

- 点击 breadcrumb 的第一项(to="/dashboard/manager") 也会执行组件 SideBar,SideBar 里也能取到新的 defaultSelectedKeys 和 defaultOpenKeys 值，但左侧 menu 的选中项不变，不 render()？需要重新刷新？
- breadcrumb 的第一项(to="/dashboard")就没问题 （实际上也是<Redirect to="/dashboard/manager" />

# Task 6

用递归实现斐波那契数列计算,当传入数值比较大时，占用太多内存，容易使电脑崩溃。
` function fib(num) {
if (num > 0 && Number.isInteger(num)) {
if (num === 1 || num === 2) return 1;
}
return fib(num - 1) + fib(num - 2);
}

console.log(fib(16)); `

- 递归规则：
  -- 知道什么时候停止
  -- 知道怎样算一个步骤
  -- 把问题分解为一个步骤和一个较小的问题

# Task 5

- 完成情况
  -- student 的 edit add delete 功能
  -- detail 页面只完成部分
  -- 静态面包屑

- 思路：
  -- add 将表单数据作为参数传入执行 form 的 onFinish 方法，onFinish 方法实际调用的是父组件 Students 传递下来的属性方法 handleFormSubmit，调用 api - addStudent,如果成功,设定 isModalVisible 关闭 modal, 如果提交不成功提示信息
  -- edit,思路类似，调用 api - updateStudent,如果成功，还需要更新当前的 render 数据，即 Table 组件的 data,这里需要特别处理，因为往后端发送参数的 type 是数字，但从后端返回以及在 Table 数据中的 type 是一个对象{name,id}

-想法： 操作 add delete 后最好重新发送当前分页的请求（edit 可以不用）

上次任务问题答案：
返回 204 请求是因为跨域而引起的，浏览器在处理跨域访问的请求时如果判断请求为复杂请求，则会先向服务器发送一条预检请求，被允许后，会发送第二个请求（返回 code 200)
`const debouncedQuery = (e) => { debounce(function () { setQuery(e.target.value); }, 1000)(); };`
搜索框代码不能按上面写，因为输入框 onChange 一次，都会执行 debounce 函数一次，所以用 hook - useCallback

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

```

```
