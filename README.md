# wrote Login page - sign in form

课上回顾：

- 跨越：协议，域名或端口不同
  -- 解决办法：服务器设置 cors，web 服务器反向代理请求，jsonP 跨域方式, src 一段资源加上参数，web socket 天生支持跨域，前端 proxy 跨域代理
- 组件标签可以加类型，如<string>，组件就是一个函数
- 请求错误：Provisional headers are shown，
  -- 原因可能有：url 写错，命中缓存时可能出现，被插件阻塞，证件过期
  -- 方法之一：1. 打开 chrome://net-export 点击唯一按钮将网络请求保存到指定文件；2.另打开一窗口，触发相应请求；3.chrome://net-export/点击 stopLogging；4. https://netlog-viewer.appspot.com/#import 这个网页中将文件导入进来，方便查看信息；5. 左变侧边栏有个 events，可以搜索想看的请求。
- 设置中间状态尽量避免，可以用数学计算方法代替

# Task 10

## 思路

- 采用 antd 进度条 Steps 实现单页面分步骤编辑处理
  -- 设定它的数据结构，包含 title 和 content
  -- 利用 current 状态值的改变，实现 step 内容的跳转

- add course 页面的思路，也就是 Form 处理

-- useEffect 得到 courseType 和 CourseCode,作为数据用于表单的 item
-- select teacher item -这里有点不同，onfocus 从后端得到 teachers, -然后关键词搜索得到过滤的 select 选择项
-- course code 由于该 item 需要 disabled，提交的时候取不到数据，所以得到 code 数据的时候就要设定该 fieldvalue -然后 start date, price, student limit, duration 相抵简单 -接着 description 主要 css 设置
-- upload 功能：-beforeUpdate 限制图片大小 -onChange 如果上传成功，将返回的 url 作为 cover 值-onPreview 设定一个对象的属性值 数据用于模态框 modal -fileList 来限制上传个数 -取消上传按钮 如果上传太慢可以选择它取消

-- 提交数据，保存返回数据，跳转到第二步

- Update-chapter-form: chapters classTime 页面
  -- Form.List 的应用 fields add remove
  -- onchange 需要先删除有选择过的 -过滤 option -点击-号 需要更新选择项

## 问题

- 上传图片不成功：Status Code: 503 Service Unavailable
- 即使添加图片失败 也可以点击提交表单 cover=''

# Task 9

课上回顾：

- MDN 上面学习元素高度
- css:先写对布局影响比较大的属性，如 display position flex 再写对布局影响比较小的或没有影响的
- 鸭式辩型 《JavaScript 权威指南》
- 调试方法之一: declare 一个变量 在看下变量名. 看有什么属性
- 函数声明与函数表达式区别：函数声明有作用域的提升
- bind，call，apply，箭头函数可以改变 this
- useEffect 完全指南：https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/ useEffect 里的 callback 第一次执行是在函数组件 return 完之后

## 思路

- 建立得到某个 id course 的 api 函数
- 从当前路由得到 id，然后调用 api 得到网页 render 需要的 data
- 利用 antd 组件和自定义组件，结合数据，写页面布局和渲染内容
- 利用调试工具帮助，调整 css,如调整左边 Card 下方 element 的 border，进度条 steps，当前 activeIndex, Collapse，当前打开的 panel

## 问题：

- 在一作用域内定义常量 与 state 名字一样 不会冲突 局部常量查找从内向外查找

### API 前端接口实现：

1. 搞清楚 API
   请求的结构 interface xxxxRequest{}, 响应的结构 interface xxxResponse() ps restful -> {code: number,data:any,msg:string} ---> 自定义的 code 先把结构定义出来
2. 接口的实现
   xxxRequest ---> 请求函数的实现，依赖 req and res
3. 调用方怎么收集 request 信息， 发送请求 -----> 处理请求 --->
4. 写 UI，如果先写 UI，需要填点假数据进去

# Task 8

## 完成：

- 整理路由结构
- infiniteScroll list

## infiniteScroll list 思路；

- 建立 courses 的 api 函数
- 下载可以实现的 infiniteScroll 的包
- 从 api 得到数据，并设定 infiniteScroll 组件需要的参数，设定 infiniteScroll 组件
- 通过组件滚动条触发函数（next）触发重新查询后台数据
- 设定 infiniteScroll 组件的子组件 List 的 render 样式
- 设定可以让滚动条回到顶部的组件

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
