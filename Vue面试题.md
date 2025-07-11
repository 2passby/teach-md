## Vue心得

## Vue中的路由配置

总结：

 当路径匹配时，Vue Router 会从最外层的父路由开始匹配，父组件先被渲染，  然后通过 router-view渲染子组件 

比如在 Vue Router 中，如果 `/` 和 `/home` 是父子路由的关系，那么在 `/` 页面使用 `` 跳转到 `/home`，`/home` 页面的内容将会被加载到 `/` 页面的 `` 中。 

vue中的项目默认启动页面是/ 也就是根路径 ，路由的启动 首先找 / 路径对应的组件

分析下图的路由实例

1.在这里/路径对应的组件是``LayoutContainer.vue ``  也就是一级路由

2.在``LayoutContainer.vue`` 展示router-view 组件，也就是渲染 一级路由中的二级路由

3.在这里``ArticleManage.vue，UserProfile.vue，UserAvator.vue，UserPassword.vue，ArticleChannel.vue ``也就是/路径下的二级路由，可以通过router-link在/路径下跳转这些页面，加载二级路由





```javascript
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',

      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/avator',
          component: () => import('@/views/user/UserAvator.vue'),
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})
```

## Vue中的钩子函数

### vue2中的生命周期钩子

三个阶段 挂载阶段：beforeCreate、created、beforeMounted、mounted  更新阶段：beforeUpdate、updated  销毁阶段：beforeDestroy、destroyed  2. 每个阶段的特性  🤔 beforeCreate：创建实例之前 🤔 created：实例创建完成（执行new Vue(options)），可访问data、computed、watch、methods上的方法和数据，可进行数据请求，未挂载到DOM结构上，不能获取el属性，如果要进行dom操作，那就要用nextTick函数 🤔 beforeMount：在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数 🤔 mounted：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，可进行数据请求 🤔 beforeupdate：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器 🤔 updated：虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新 🤔 beforeDestroy：实例销毁之前调用，this仍能获取到实例，常用于销毁定时器、解绑全局事件、销毁插件对象等操作 🤔 destroyed: 实例销毁之后



父子组件执行顺序 挂载：父created -> 子created -> 子mounted> 父mounted  更新：父beforeUpdate -> 子beforeUpdated -> 子updated -> 父亲updated  销毁：父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed 



### vue3中的生命周期钩子

 vue3有7个，一进入setUp是创建阶段，接着是onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted

## 组件通信的方式

**父子组件通信**

**核心方法**为`props`、`emit`和`refs`：

- **props**：父组件通过属性向下传递数据，子组件通过`props`接收，实现**单向数据流**。
- **emit**：子组件通过`$emit`触发自定义事件，父组件通过`v-on`监听并响应，完成**子到父的通信**。
- **refs**：父组件通过`ref`标记子组件，直接调用其方法或访问属性（需慎用，可能破坏组件封装性）。

------

**兄弟组件通信**

**常见方案**为`emit`结合父组件中转或使用**事件总线（EventBus）**：

- **父组件中转**：兄弟组件通过共同的父组件传递事件（子A→父→子B），适用于层级简单场景。
- **事件总线**：通过一个全局Vue实例（`const bus = new Vue()`）作为中央事件中心，兄弟组件通过`bus.$emit`和`bus.$on`通信，实现解耦，但需注意**事件命名冲突**和**内存泄漏风险**。

------

**隔代组件（跨层级）通信**

**核心方式**为`provide/inject`和`$attrs/$listeners`：

- **provide/inject**：祖先组件通过`provide`提供数据，后代组件通过`inject`注入，实现**跨层级透传**（类似React Context），但可能导致数据来源不透明。
- **attrs/\*a\**tt\**rs\*/listeners**：祖先组件通过`v-bind="$attrs"`和`v-on="$listeners"`透传未被props接收的属性和事件，常用于高阶组件封装。

------

**复杂场景通信**

**推荐使用状态管理库**（如Vuex或Pinia）：

- **Vuex**：通过`store`集中管理全局状态，组件通过`dispatch`触发`actions`、`commit`修改`mutations`，实现**跨组件状态共享与同步**。
- **Pinia**：Vue3的轻量级替代方案，支持`Composition API`，提供更简洁的API和TypeScript支持，核心逻辑与Vuex类似。

## computed和watch的区别

 computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值； watch： 更多的是观察的作用，支持异步，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；  加分回答 computed应用场景：需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算； watch应用场景：需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API ) 

## v-if 与 v-show的区别

 作用: 都是控制元素隐藏和显示的指令 区别： v-show: 控制的元素无论是true还是false，都被渲染出来了，通过display：none控制元素隐藏 v-if: 控制的元素是true，进行渲染，如果是false不渲染，根本在dom树结构中不显示  加分回答 应用： v-show: 适合使用在切换频繁显示/隐藏的元素上 v-if: 适合使用在切换不频繁，且元素内容很多，渲染一次性能消耗很大的元素上 

##  vue 的 keep-alive 

 1、keep-alive是vue的内置组件，能在组件切换过程中将状态保留在内存中，相当于缓存，防止DOM的重复渲染；2、keep-alive有三个属性：include（只有名字匹配的才会被缓存）、exclude（任何名字匹配的都不会被缓存）、max（最多可以缓存多少个组件）。3、在路由router的中：相应组件下规定meta属性，定义keep-alive：true；4、可以结合Vue组件实例加载顺序讲解，VNode->实例化->_updata->真实Node，在实例化的时候会判断该组件是否被keep-alive保存过，是的话则直接拿其中的DOM进行渲染

## Vue 中 $nextTick 作用与原理

  Vue 在更新 DOM 时是异步执行的，在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。所以修改完数据，立即在方法中获取DOM，获取的仍然是未修改的DOM。  $nextTick的作用是：该方法中的代码会在当前渲染完成后执行，就解决了异步渲染获取不到更新后DOM的问题了。 $nextTick的原理：$nextTick本质是返回一个Promise  加分回答 应用场景：在钩子函数created()里面想要获取操作Dom，把操作DOM的方法放在$nextTick中 

## Vue 遍历渲染列表为什么加 key？

 为了性能优化 因为vue是虚拟DOM，更新DOM时用diff算法对节点进行一一比对，比如有很多li元素，要在某个位置插入一个li元素，但没有给li上加key，那么在进行运算的时候，就会将所有li元素重新渲染一遍，但是如果有key，那么它就会按照key一一比对li元素，只需要创建新的li元素，插入即可，不需要对其他元素进行修改和重新渲染。  加分回答 key也不能是li元素的index，因为假设我们给数组前插入一个新元素，它的下标是0，那么和原来的第一个元素重复了，整个数组的key都发生了改变，这样就跟没有key的情况一样了 

## Vue-router 懒加载的作用

 懒加载的核心思想是按需加载，也叫做异步加载：只有请求到该组件的时候，才会对该组件进行网络请求并加载。懒加载有利于解决页面首次请求资源过多，导致白屏时间长的问题。 

vue-router的懒加载即通过箭头函数的写法导入组件如 const Login = ()=> import('../路径')；    

 异步组件形式：component:resolve => (require(['./home.vue'], resolve));


## HashRouter 和 HistoryRouter的区别和原理

history和hash都是利用浏览器的2种特性实现前端路由，

history是利用浏览历史记录栈的API实现，hash是监听location hash值变化window.onhaschange事件来实现 2.history的url没有#号，hash有#号 

3.相同的url,history会触发添加到浏览器历史记录栈中，hash不会触发，history需要后端配合，如果后端不配合刷新页面会出现404，hash不需要 

hashRouter原理：通过window.onhashchange获取url中hash值

 historyRouter原理：通过history.pushState,使用它做页面跳转不会触发页面刷新，使用window.onpopstate监听浏览器的前进和后退 ... 展开  

## Vuex是什么，每个属性是干嘛的，如何使用 ？ 

 Vuex是为Vue开发的管理状态模式，集中存储管理所有组件的状态。属性分别由state、getters、mutations、actions、module。 

（1）state用来定义所要存储的数据，通过$store.state调用数据 

（2）getters可以认为是store的计算属性，通过$store.getters调用属性 

（3）mutations用来存放改变state数据的同步方法，每个方法接收的参数都是state，用$store.commit来调用mutations中的同步方法 

（4）actions用来存放异步方法，接收的参数是context（mutations中的方法），通过$store.dispatch调用actions中的方法 

（5）module将store分割成模块，每个模块有自己的state、getters、mutations、actions、甚至嵌套子模块，从上至下进行同步分割

## Vue2双向绑定的原理与缺陷

  Vue响应式指的是：组件的data发生变化，立刻触发试图的更新 

原理： Vue 采用数据劫持结合发布者-订阅者模式的方式来实现数据的响应式，通过Object.defineProperty来劫持数据的setter，getter， 每个数据属性都有一个对应的 `Dep` 实例。当 `getter` 被调用时，当前的 `Watcher` 实例会被添加到该数据属性的 `Dep` 的 `subs` 列表中。这样，`Dep` 就记录了所有依赖该数据属性的 `Watcher`。 在数据变动时发布消息给订阅者，订阅者收到消息后进行相应的处理Object.defineProperty 数据劫持

每个组件实例对应一个 **Watcher** 观察者，当数据变化时，会通知所有依赖的 Watcher 进行更新。**Dep 类**作为发布者负责管理订阅者(Watcher)，形成数据变化的监听机制。这种模式实现了数据与视图之间的解耦。

Vue2.0 使用 **Object.defineProperty** 来劫持对象属性的 getter 和 setter。当访问数据时触发 getter 进行**依赖收集**，当修改数据时触发 setter 进行**派发更新**。这种方式只能劫持**已存在的属性**，无法检测到对象属性的新增或删除。



数组变异方法

由于 Object.defineProperty 无法直接监听数组变化，Vue2.0 通过**重写数组方法**（push、pop、shift 等）来实现数组的响应式。这些变异方法会触发视图更新，同时保持原生数组方法的原有功能。

Object.defineProperty Object.defineProperty API的使用  作用: 用来定义对象属性 特点： 默认情况下定义的数据的属性不能修改 描述属性和存取属性不能同时使用，使用会报错  响应式原理： 获取属性值会触发getter方法 设置属性值会触发setter方法 在setter方法中调用修改dom的方法  加分回答 Object.defineProperty的缺点 1. 一次性递归到底开销很大，如果数据很大，大量的递归导致调用栈溢出 2. 不能监听对象的新增属性和删除属性 3. 无法正确的监听数组的方法，当监听的下标对应的数据发生改变时 

## Vue3双向绑定的原理

 Vue3.0 是通过Proxy实现的数据双向绑定，Proxy是ES6中新增的一个特性，实现的过程是在目标对象之前设置了一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。 

当访问响应式对象的属性时，Proxy 的 `get` 拦截器会被触发。在这个拦截器中，Vue 会进行依赖收集，即将当前的依赖（如视图渲染函数或计算属性）添加到该属性的依赖列表中。 

当修改响应式对象的属性时，Proxy 的 `set` 拦截器会被触发。如果新值与旧值不同，Vue 会触发更新操作，通知所有依赖该属性的订阅者进行更新    

 `Object.defineProperty`  的问题：在Vue中，`Object.defineProperty`无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。目前只针对以上方法做了hack处理，所以数组属性是检测不到的，有局限性，Object.defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue里，是通过递归以及遍历data对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象，不管是对操作性还是性能都会有一个很大的提升。 Proxy的两个优点：可以劫持整个对象，并返回一个新对象 

## **Vue3 响应式核心：`track` 与 `trigger` 详解**

Vue3 的响应式系统基于 `Proxy` 和 `Reflect`，通过 **`track`（依赖收集）** 和 **`trigger`（依赖触发）** 机制实现数据的动态更新。这是对 Vue2 的 `Dep/Watcher` 机制的一次彻底重构，解决了 Vue2 响应式的局限性（如对新增属性、数组索引修改的监听不足）。

------

**1. 核心概念**

**(1) `track`（依赖收集）**

- **作用**：在访问响应式对象的属性时，收集当前正在运行的副作用（`effect`，如组件的渲染函数或计算属性）。
- **触发时机**：当通过 `Proxy` 的 `get` 拦截器访问属性时。
- **实现逻辑**：
  - 每个响应式对象的属性关联一个依赖集合（`deps`）。
  - 当属性被读取时，将当前活动的 `effect` 添加到该属性的依赖集合中。

**(2) `trigger`（依赖触发）**

- **作用**：在修改响应式对象的属性时，触发与该属性关联的所有副作用重新执行。
- **触发时机**：当通过 `Proxy` 的 `set`、`deleteProperty` 等拦截器修改属性时。
- **实现逻辑**：
  - 找到该属性关联的依赖集合。
  - 遍历依赖集合，执行所有 `effect`。

## 前端性能优化的手段

 一类是文件加载更快，另一类是文件渲染更快。

==加载更快的方法==： 

1.让传输的数据包更小（压缩文件/图片）：图片压缩和文件压缩 

2.减少网络请求的次数：雪碧图/精灵图、节流防抖 

3.减少渲染的次数：缓存（HTTP缓存、本地缓存、Vue的keep-alive缓存等）  

==渲染更快的方法==： 

1.提前渲染：ssr服务器端渲染 ，避免渲染阻塞：CSS放在HTML的head中  JS放在HTML的body底部 

2.避免无用渲染：懒加载 ，比如图片懒加载和路由懒加载

3.减少渲染次数：对dom查询进行缓存、将dom操作合并、使用减少重排的标签  

加分回答 雪碧图的应用场景一般是项目中不常更换的一些固定图标组合在一起，比如logo、搜索图标、切换图标等。 电商项目中最常用到的懒加载，一般在查看商品展示的时候通常下拉加载更多，因为商品数据太多，一次性请求过来数据太大且渲染的时间太长。 

## 性能优化有哪些性能指标

前端性能优化的关键指标及量化方法

==加载性能指标==

**首次内容绘制(First Contentful Paint, FCP)**：测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。可以使用Chrome DevTools的Lighthouse工具或Web Vitals库进行测量，**良好标准是1.8秒内**。

**最大内容绘制(Largest Contentful Paint, LCP)**：测量视口内最大内容元素可见的时间。这是衡量加载性能的核心指标，**推荐2.5秒内完成**。可以通过PerformanceObserver API或浏览器开发工具获取。

==交互性能指标==

**首次输入延迟(First Input Delay, FID)**：测量用户首次与页面交互到浏览器实际能够响应该交互的时间。**优秀值应小于100毫秒**，可使用Web Vitals JavaScript库进行跟踪。

**总阻塞时间(Total Blocking Time, TBT)**：测量FCP和TTI（正常交互的事件）之间主线程被阻塞的时间总和。**建议控制在300毫秒内**，这对输入响应有直接影响。

==视觉稳定性指标==

**累积布局偏移(Cumulative Layout Shift, CLS)**：测量页面生命周期中发生的意外布局偏移的得分。**良好体验应小于0.1**，可通过Layout Instability API监控。

==资源使用指标==

**页面总大小(Total Page Size)**：包括所有HTML、CSS、JavaScript、图片等资源。**建议控制在1-2MB以内**，可通过Network面板查看。

**HTTP请求数量(HTTP Request Count)**：页面加载时发起的请求总数。**理想情况应少于50个**，现代网站常通过资源合并减少请求数。

==运行性能指标==

**JavaScript执行时间(JavaScript Execution Time)**：测量脚本解析、编译和执行的总时间。**应控制在1秒内**，可通过Performance面板分析。

**内存使用量(Memory Usage)**：页面运行时的内存占用情况。可使用Chrome的Memory面板监控，**避免内存泄漏(Memory Leak)**是关键。

## 说一下服务端渲染

 **服务端渲染**（Server-Side Rendering）是指由**服务器直接生成完整的HTML页面**并返回给客户端（浏览器）的渲染方式。**核心特点**是页面的内容在服务器端完成动态组装，浏览器接收到HTML后可直接展示，无需等待客户端JavaScript执行渲染逻辑。 

**SSR的工作流程**

1. **用户请求页面**
   客户端向服务器发送页面请求（如访问URL）。
2. **服务器动态生成HTML**
   服务器执行业务逻辑（如读取数据库、调用API），将数据与模板结合生成完整HTML。
3. **返回HTML至客户端**
   浏览器直接接收并渲染HTML，用户立即看到内容。
4. **客户端注水（Hydration）**
   后续加载JavaScript代码，将静态HTML转换为可交互的页面（如绑定事件）。

------

**SSR的核心优势**

1. **SEO优化**
   爬虫可直接解析服务器返回的完整HTML内容，避免JavaScript未执行导致的空白页面问题。
2. **首屏性能提升**
   用户无需等待JavaScript下载和执行即可看到内容，降低白屏时间。
3. **兼容性更强**
   对不支持JavaScript或性能较差的设备更友好（如老旧浏览器、低端手机）。

------

**SSR的局限性**

1. **服务器压力大**
   每次请求均需服务器动态生成HTML，高并发场景下可能成为性能瓶颈。
2. **开发复杂度高**
   需协调服务端和客户端的代码兼容性（如避免Node.js与浏览器API的差异）。
3. **交互延迟**
   注水（Hydration）前页面无法响应交互，可能影响用户体验。

## 可以讲一下ssr的同构与析构

**1. 普通客户端渲染（CSR）**

- **流程**：
  1. 浏览器请求 HTML（通常为空壳，仅包含 JS/CSS 链接）。
  2. 下载并执行 JS 代码（可能体积较大）。
  3. JS 执行后发起 API 请求获取数据，渲染页面内容。
- **首屏速度**：
  - **最慢**，用户需等待 JS 下载、执行、数据请求、渲染完成才能看到内容。
  - 若 JS 文件较大或网络较差，首屏白屏时间显著延长。
- **典型场景**：
  SPA（如纯 React/Vue 应用）无服务端渲染优化。

------

**2. 同构 SSR（如 Next.js/Nuxt.js）**

- **流程**：
  1. 服务端运行 JS 代码（如 React/Vue），生成包含数据的完整 HTML。
  2. 浏览器直接收到渲染好的 HTML，立即展示内容。
  3. 并行加载 JS 文件，执行 Hydration（绑定事件、接管交互）。
- **首屏速度**：
  - **快**，用户第一时间看到完整内容（无需等待 JS 执行）。
  - Hydration 阶段可能轻微影响可交互时间（TTI），但不影响首屏内容展示。
- **优化点**：
  - 服务端预取数据，减少客户端请求。
  - 代码分割（Code Splitting）减少 Hydration JS 体积。

------

**3. 异构 SSR（如 Java + 模板引擎 + 前端框架）**

- **流程**：
  1. 服务端用后端语言（如 Java/PHP）生成 HTML（通过模板引擎注入数据）。
  2. 浏览器直接展示 HTML，客户端 JS 独立加载并接管后续交互（可能需重新请求数据）。
- **首屏速度**：
  - **快**，与同构 SSR 类似，用户立即看到服务端渲染的 HTML。
  - 若服务端渲染效率高（如 Java 微服务优化），可能略快于同构 SSR（Node.js 的瓶颈场景）。
- **潜在问题**：
  - 客户端可能需要重复请求数据（若未将数据嵌入 HTML）。
  - 前后端逻辑分离可能导致冗余代码（如路由匹配）

## XSS攻击是什么？ 

 【原理】 
 跨站脚本攻击XSS，是最普遍的Web应用安全漏洞。这类漏洞能够使得攻击者嵌入恶意脚本代码到正常用户会访问到的页面中，当正常用户访问该页面时，则可导致嵌入的恶意脚本代码的执行，从而达到恶意攻击用户的目的（读取cookie、session cookie以及其他敏感信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等）。 
 【类型】  

1. 反射型XSS：攻击者事先制作好攻击链接,需要欺骗用户自己去点击链接才能触发XSS代码，由于被访问的网站没有对url过滤，导致恶意脚本执行，所谓反射型XSS就是将恶意用户输入的js脚本，反射到浏览器执行。  

2. 存储型XSS：代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，每当有用户访问该页面的时候都会触发代码执行，这种XSS非常危险，容易造成蠕虫，大量盗取cookie，也被称为持久型XSS。  

3. DOM型XSS：类似于反射型XSS，但这种XSS攻击的实现是通过对DOM树的修改而实现的。  
    【防范】  
    \- 在用户提交参数前，将提交的字符< 、>、&、" 、' 、+、/等进行转义，严格控制输出。 
    \- 将输入转化为小写对比javascript:，若匹配则过滤。 
    \- 将cookie设置为http-only,js脚本将无法读取到cookie信息。 
    \- 纯前端渲染，明确innerText、setAttribute、style，将代码与数据分隔开。 
    \- 避免不可信的数据拼接到字符串中传递给这些API，如DOM中的内联事件监听器，location、onclick、onerror、onload、onmouseover等，a标签的href属性，JavaScript的eval()、setTimeout()、setInterval()等，都能把字符串作为代码运行。 
    \- 对于不受信任的输入，都应该限定一个合理的长度。 
    \- 严格的CSP，禁止内联脚本执行等较为严格的方式。



##  CSRF攻击是什么？ 

 CSRF跨站点请求伪造（Cross Site Request Forgery）和XSS攻击一样，有巨大的危害性，就是攻击者盗用了用户的身份，以用户的身份发送恶意请求，但是对服务器来说这个请求是合理的，这样就完成了攻击者的目标。CSRF攻击的过程原理是：-用户打开浏览器，访问目标网站A，输入用户名和密码请求登录-用户信息在通过认证后，网站A产生一个cookie信息返回给浏览器，这个时候用户可以正常发送请求到网站A

-用户在没有退出网站A之前同一个浏览器打开了另一个网站B。-新网站B收到用户请求之后返回一些攻击代码，并发出一个请求要求访问返回cookie的网站A-浏览器收到这些攻击性代码之后根据新网站B的请求在用户不知道的情况下以用户的权限操作了cookie并向网站A发起了合法的请求。

预防CSRF攻击主要有以下策略

1.-使用验证码，在表单中添加一个随机的数字或者字母验证码，强制要求用户和应用进行直接的交互，-

2.HTTP中Referer字段，检查是不是从正确的域名访问过来，他记录了HTTP请求的来源地址。

3.-使用token认证，在HTTP请求中添加token字段，并且在服务器建立一个拦截器验证这个token，如果token不对，就拒绝这个请求

4.SameSite cookie ，设置为strict则禁止跨站请求cookie，设置为 `Lax`（允许安全HTTP方法如GET 

##  说一下Diff算法？ 

 Diff算法主要就是在虚拟DOM树发生变化后，生成DOM树更新补丁的方式，对比新旧两株虚拟DOM树的变更差异，将更新补丁作用于真实DOM，以最小成本完成视图更新；2、框架会将所有的结点先转化为虚拟节点Vnode，在发生更改后将VNode和原本页面的OldNode进行对比，然后以VNode为基准，在oldNode上进行准确的修改。

**同级比较策略**

Vue的Diff算法仅在同一层级的虚拟DOM节点间进行比较，**不跨层级递归**。例如：

- 若新旧节点处于不同层级（如从父节点移动到子节点位置），**直接销毁并重建**，而非尝试移动。
- **优势**：减少算法复杂度（从O(n³)优化至O(n)），避免深层嵌套导致的性能问题。

------

**双端对比策略（双指针优化）**

Vue对**列表节点**的Diff采用**双端指针**（头尾各两个指针）进行快速匹配：

1. **头头对比**：若新旧头节点相同，直接复用，指针后移。
2. **尾尾对比**：若新旧尾节点相同，直接复用，指针前移。
3. **均不匹配时**：基于`key`查找可复用节点，否则新建节点。

------

**Key的作用与重要性**

- **核心价值**：`key`是节点的唯一标识，帮助Diff算法**精准识别相同节点**，避免就地复用导致的状态错乱（如列表顺序变化时的输入框内容错位）。
- **错误用法**：使用数组索引作为`key`可能导致性能下降或渲染错误（如列表中间插入元素时，索引变化导致误判）。

------

**Diff算法的具体步骤**

1. **节点类型不同**：直接替换整个节点（如``变为``）。
2. **节点类型相同**：
   - **静态节点**：跳过比较，直接复用。
   - **动态节点**：对比属性（`class`、`style`等）和子节点。
3. **子节点对比**：
   - **无子节点**：清空旧子节点。
   - **有子节点**：根据双端对比策略更新子节点列表。

------

**Diff算法的性能优势**

1. **就地复用**：对相同节点仅更新属性，减少DOM操作。
2. **批量更新**：合并多次数据变更，一次性更新DOM。
3. **高效查找**：通过`key`和双端指针快速定位可复用节点。

## .vue文件可以直接在浏览器上运行吗？

不能。浏览器无法直接解析.vue 文件。因为.vue 文件是 Vue.js 的单文件组件，它包含模板（template）、样式（style）和脚本（script）三个部分。浏览器原生并不支持这种自定义文件格式，它只能识别标准的 HTML、CSS 和 JavaScript 文件。所以需要使用打包工具（如 Webpack 或 Vite）来处理.vue 文件，将其转换为浏览器可以识别的代码。

## Vue 变成 js 代码是通过 Webpack 中的什么完成的

- 主要通过 vue - loader 来完成。vue - loader 会解析.vue 文件，其中的关键步骤是调用 Vue 编译器。Vue 编译器将模板部分编译成渲染函数（render function），渲染函数是用 JavaScript 表示的模板结构。同时，脚本部分也会被处理，可能使用其他 loader（如 babel - loader）来转换 JavaScript 代码，以确保兼容性。样式部分会根据 loader 配置进行处理，如提取为单独的 CSS 文件或注入到 JavaScript 中。最终，这些处理后的部分整合成一个完整的 JavaScript 模块。

## **Vue 文件想在浏览器上运行需要 Webpack 或者 Vite 的打包处理吗？**

需要。无论是 Webpack 还是 Vite，它们在处理.vue 文件时都有各自的方式。

**Webpack 方式** ：在 Webpack 中，主要依赖 vue - loader 来处理.vue 文件。vue - loader 会将.vue 文件的模板、样式和脚本部分分别交给不同的 loader 进行处理。例如，模板部分可能会使用 Vue 编译器进行编译，样式部分可能会交给 css - loader、style - loader 等进行处理，脚本部分可能会交给 babel - loader 进行转换，以确保兼容性。最终，这些处理后的部分会被整合成一个 JavaScript 模块，作为 Webpack 打包过程的一部分。

**Vite 方式** ：Vite 利用浏览器原生 ESM 的特性，在开发阶段通过按需编译的方式快速处理.vue 文件。当开发者访问某个.vue 文件对应的页面时，Vite 会实时地将.vue 文件转换为浏览器可以执行的 JavaScript 代码。

## **模版编译的时机在什么过程**

- **Webpack 打包过程** ：在 Webpack 打包 Vue 项目时，模板编译主要在 Webpack 的打包过程中完成。vue - loader 会调用 Vue 编译器来编译模板部分。当 Webpack 遇到.vue 文件时，会触发 vue - loader 的处理流程，其中模板编译是关键步骤之一。生成的渲染函数代码会作为 JavaScript 模块的一部分输出，等待后续的打包处理，如代码压缩、分包等。
- **Vite 开发过程** ：在 Vite 开发环境中，模板编译是在开发服务器运行时按需进行的。当开发者访问某个.vue 文件对应的页面时，Vite 会调用 Vue 的编译器对模板进行实时编译，生成渲染函数并返回给浏览器，这样可以实现快速的开发体验。

## Vite为什么比webpack快？


1. 开发阶段的快速启动

- **基于浏览器原生 ES 模块（ESM）**
  - Vite 利用浏览器原生的 ESM 加载机制，在开发阶段无需提前打包整个项目。当开发者运行开发服务器时，浏览器可以直接解析 ES 模块，Vite 只需要对当前访问的页面及其依赖的模块进行按需编译。这与 Webpack 等传统打包工具的全量打包形成了鲜明对比，大大提高了开发效率。
- **冷启动速度极快**
  - Vite 的开发服务器启动速度极快，基本上是秒级启动。这是因为 Vite 不需要等待全量打包完成就可以启动服务器，开发者可以更快地进入开发状态。

2. 热更新（HMR）优势

- **毫秒级热更新**
  - Vite 能够实现毫秒级的热更新。当开发者修改代码时，只有发生变动的模块会被重新加载和更新，而不是刷新整个页面。这使得开发过程更加流畅，开发者可以快速看到代码修改后的效果，减少等待时间。相比之下，Webpack 虽然也有热更新功能，但在某些情况下更新速度相对较慢，尤其是在大型项目中。

3. 按需编译

- **仅编译当前页面所需模块**
  - 在开发过程中，Vite 只会对当前页面所依赖的相关模块进行编译，而不是像 Webpack 那样进行全量打包。这种按需编译的方式可以极大地节省时间，尤其是在大型项目中有众多模块时，优势尤为明显。

4. 生产环境构建优化（虽然主要是开发快，但生产构建也有优势）

- **使用 Rollup 进行高效打包**
  - Vite 使用 Rollup 进行生产环境的构建。Rollup 可以很好地实现 Tree - shaking（摇树优化），去除项目中未被引用的代码，减小最终的打包体积。同时，它还支持代码分割等优化策略，将项目代码分割成多个小的 chunk，按需加载，提升生产环境下用户访问时的性能。

5. 预构建依赖

- **加速二次启动**
  - Vite 会用 Esbuild 将 CommonJS 模块转换为 ESM。这种预构建依赖的工作使得在后续项目的二次启动或者代码变动重新加载时，能加速整体流程，减少了重复的转换耗时。

总结

Vite 之所以比 Webpack 快，主要是在开发阶段利用浏览器原生 ESM 实现按需编译和快速启动，以及在生产环境借助 Rollup 等工具进行高效构建。这种设计使得开发和构建过程更加高效，提升了整体的开发体验。





## vite如何配置语法降级

在 Vite 中配置语法降级以兼容低版本浏览器（如 IE11），主要借助 @vitejs/plugin-legacy 插件。这涉及到两步关键操作：插件的安装与配置。先通过 npm install @vitejs/plugin-legacy --save-dev 命令完成插件安装。随后，在 vite.config.js 文件中，利用 legacy 函数引入该插件，并通过 targets 属性精准指定目标浏览器，设置为 ['ie >= 9'] 可确保语法降级到 ES5。此外，还可依据项目需求，借助 polyfills 和 additionalLegacyPolyfills 属性手动添加所需 polyfill，像这样：polyfills: ['es.symbol', 'es.promise']。这种配置让 Vite 构建时，把代码转为低版本浏览器可执行的形式，从而解决跨浏览器兼容性问题。
## Tree Shaking 的核心原理

Tree Shaking 的本质是通过 **静态代码分析** 移除 JavaScript 中未被使用的代码（Dead Code）。其实现依赖以下关键点：

 **Vite 的 Tree Shaking 流程**

1. **开发环境**
   Vite 在开发模式下使用浏览器原生 ES Module 加载模块，**不进行 Tree Shaking**，以保持极快的热更新速度。此时未使用的代码仍会被浏览器下载，但不会执行。
2. **生产环境**

1. **ES Module 的静态结构**
   ES6 的 `import/export` 是静态声明（代码在编译阶段即可确定依赖关系），而 CommonJS 的 `require` 是动态的（运行时解析）。只有静态结构才能被准确分析。
2. **作用域分析**
   打包工具（如 Rollup）在构建时分析模块之间的导入导出关系，标记未被引用的变量、函数或模块。
3. **代码压缩阶段的删除**
   标记后的无用代码在压缩阶段（如 Terser）被删除，最终不进入生产包。

## vue2实现数组响应式的原理

**步骤 1：重写数组的 7 个变异方法**

- **目标**：让调用这些方法时自动触发视图更新。
- **方法**：
  1. 基于原生 `Array.prototype` 创建一个新对象 `arrayMethods`。
  2. 覆盖 `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse` 这 7 个方法。

**步骤 2：修改数组的原型链**

- **目标**：让数组实例调用重写后的方法，而非原生方法。
- **实现**：
  - 将数组的 `__proto__` 指向 `arrayMethods`（现代浏览器）。
  - 对于不支持 `__proto__` 的浏览器（如 IE10-），直接将重写的方法添加到数组实例上。

**步骤 3：递归观察数组元素**

- **目标**：如果数组元素是对象或数组，递归将其转换为响应式。
- **实现**：
  - 遍历数组，对每个元素调用 `observe` 函数。

**步骤 4：依赖收集与更新**

- **目标**：当数组被使用时收集依赖（如模板渲染），在修改时触发更新。
- **实现**：
  - 每个数组关联一个 `Dep` 实例（依赖管理器）。
  - 当数组在模板中被访问时，触发 `getter`，将当前 Watcher 存入 `Dep`。
  - 当调用重写的方法时，触发 `Dep.notify()`，通知所有 Watcher 更新视图。

**步骤 5：处理无法检测的操作**

- **问题**：直接通过索引修改或修改长度无法触发更新。
- **解决方案**：
  - 使用 `Vue.set(arr, index, value)` 或 `arr.splice(index, 1, value)`。
  - 原理：`Vue.set` 内部会手动调用 `dep.notify()`。