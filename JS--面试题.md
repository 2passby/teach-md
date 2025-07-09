# js

## es6 promise

promise是一个对象，保存着未来结束的事件（也就是异步操作）

promise对象有三个状态 pending（进行中） resolved（已完成） rejected（失败）,且对象的状态不受外界的影响



### promise的初步认识

```javascript
 
 //promise接受两个函数参数 分别是resolved 和 rejected 表示成功后走resloved 失败走 rejected
//resolved的返回值被.then接受 rejected的返回值被.catch接受
//可以在一个promise的then or catch函数中 return 一个新的promise实现链式调用
 new Promise((resolved, rejected) => {
      setTimeout(() => {
        let data = {
          name: "hyd",
          info: {
            id: 14,
            msg: "1234",
          },
        }
        if (data.info.msg) resolved(data)
        else {
          rejected(data.name)
        }
      }, 2000)
    })
      .then((res) => {
        console.log(res, "1")
        return new Promise((resolved, rejected) => {
          return resolved("12345")
        })
      })
      .then((res) => {
        console.log(res, "2")
      })
```



### promise封装实现类axios

```javascript
//利用xhr和promise 封装实现axios的作用
// https://cn.apihz.cn/api/time/getapi.php?id=88888888&key=88888888&type=2
    const axios_get_time = (url) => {
      return new Promise((resolved, rejected) => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.responseType = "json"
        xhr.setRequestHeader("Accept", "application/json")
        xhr.send()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log("请求成功")
            if (xhr.response.code === 200) {
              resolved(xhr.response.msg)
            } else {
              rejected(new Error(xhr.response))
            }
          } else {
            console.log("还没发出去")
          }
        }
      })
    }
    axios_get_time(
      "https://cn.apihz.cn/api/time/getapi.php?id=88888888&key=88888888&type=2"
    )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
```

### promise对象的其他方法

```javascript
<script>
    //reslove 可以将现有的任何对象转化为 promise对象
    let p = Promise.resolve("foo")

    //等价于 let p = new Promise(resolve => resolve('foo'))
    p.then((res) => {
      console.log(res)
    })

    //promise.all 执行多个异步操作
    const p1 = new Promise((resolve) => resolve("123"))
    const p2 = new Promise((resolve) => resolve("456"))
    const p3 = new Promise((resolve) => resolve("789"))

    let p4 = Promise.all([p1, p2, p3])
    //三个同时执行成功执行.then 比如一些游戏类资源加载完才进行xxxx
    p4.then((res) => {
      console.log(res)
    })
    //有一个失败才失败
    p4.catch((err) => {
      console.log(err)
    })

    function asyncTask1() {
      return new Promise((resolve) => {
        setTimeout(() => resolve("任务1完成！"), 1000)
      })
    }

    function asyncTask2() {
      return new Promise((resolve) => {
        setTimeout(() => resolve("任务2完成！"), 500)
      })
    }

    function asyncTask3() {
      return new Promise((resolve) => {
        setTimeout(() => resolve("任务3完成！"), 1500)
      })
    }

    // 使用 Promise.race() 选择最快完成的任务
    Promise.race([asyncTask1(), asyncTask2(), asyncTask3()]).then((result) => {
      console.log("最快完成的任务:", result)
    })
  </script>
```

## JS数据类型有哪些，区别是什么

JS数据类型分为基本数据类型和引用数据类型，基本数据类型一共有7类，分别为Number String Boolean Bigint symbol undefined null ，引用数据类型是Object（普通对象，数组，正则，日期 都属于object），基本数据类型存储在栈中，引用数据类型存储在堆中，但是在栈中存放了指向他们起始地址的指针，当解释器寻找其引用值得时候，会查找栈中得指针找到其地址取堆中得实体，symbol是es6新增得数据类型，作用是唯一性，可以用于对象中得key，保证对象中key唯一，bigint得特点就是数据范围大，可以解决超出数据范围得数字，但是bigint和number数据类型不可直接相加

 `Object.getOwnPropertySymbols` 获取到 `Symbol` 键，然后再在循环中进行处理。 

## js中null 和 undefined 的区别，如何让一个属性变为null 

null表示一个对象或者变量被有意的置空，null得数据类型是Object ，这是一个历史遗留问题，undefined表示一个变量未定义，比如当访问一个没有返回值得函数，或者对象中没有的属性,或者变量被声明但是没有赋值就会返回undefined，Number(null) === 0 , Boolean(null) == = false  Number(undefined) = = = NAN Boolean(undefined) == = false,在宽松比较运算符下 null == undefined 而在严格比较下，由于两者不属于同类型，所以null ! = = undefined

## js中判断变量类型的几种方法

1.typeof判断，只能判断简单数据类型，对于引用数据类型除了function返回function外 其他的均返回object

2.instanceof 主要区分引用数据类型，检测方法是判断检测的方法是 检测当 前实例得原型链上，可以检测出 Array Date Function Object多种数据类型，比如const arr = [] 既是array数据类型 也是object数据类型，

3.Object.prototype.toString.call（xxx） 可以检测所有数据类型，会返回一个字符串，表明数据得类型，

 这个方法实际上调用了对象的内部 `[[Class]]` 属性，该属性是一个内置的、不可访问的属性，用于标识对象的类型。 

4.constructor用于检索引用数据类型，检测方法是获取实例的构造函数判断和某个类是否相同 ， `null` 和 `undefined` 没有 `constructor` 属性，因此不能直接通过 `constructor` 来检测它们的类型。  如果对象的 `constructor` 属性被重写，可能会导致判断不准确。 

```javascript
const arr = [];
console.log(arr.constructor === Array); // true
```



## 实现数组去重的方法

1.利用es6中得set 将数组放入set后对set解构获取不重复得数组值，对低版本浏览器存在兼容问题

```javascript
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4]
```

2.利用对象键值唯一性实现数组去重，空间消耗大，但是效率高

```javascript
 const arr = [
      1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9, 9, 10, 10, 12, 14, 15, 15,
      16,
    ]
    const Sarr = []
    const object = {}
    for (let i = 0; i < arr.length; i++) {
      if (!object.hasOwnProperty(arr[i])) {
        object[arr[i]] = i
        Sarr.push(arr[i])
      }
    }
    console.log(Sarr)
```



3.利用filter和indexof，indexof会返回数组中第一次出现该元素的下标

```javascript
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
console.log(uniqueArray); // [1, 2, 3, 4]
```

4.reduce实现数组去重，并且可以在去重中处理更复杂得逻辑

```javascript
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = array.reduce((accumulator, current) => {
  if (!accumulator.includes(current)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);
console.log(uniqueArray); // [1, 2, 3, 4]
```

5.手写数组去重得逻辑，适配所有浏览器

```javascript
  const arr = [1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9, 9]
    const Sarr = []
    for (let i = 0; i < arr.length; i++) {
      let unique = true
      for (let j = 0; j < Sarr.length; j++) {
        if (arr[i] === Sarr[j]) {
          unique = false
          break
        }
      }
      if (unique) Sarr.push(arr[i])
    }
    console.log(Sarr)
```

## 伪数组和数组的区别

数组类型是Array，创建方式是[]或者 new Array(), 伪数组类型是Object，创建方式为通过特定方式生成(如`arquments、DOM 集合)，可以查看length，可以使用[index]查看数据，但是不能使用数组的其他的方法。使用场景为函数的参数arquements和JS获取DOM ，将伪数组转化为数组的方法有:Array.from()，Array.prototype.slice.call()

## Js中map和foreach 区别

对数组进行遍历操作得方法

1.map遍历数组，对数组进行操作，不会改变原数组，每次修改的item会存放在新数组中，返回一个新数组

2.foreach操作，遍历数组，对数组进行操作，没有返回值，单纯得遍历数组，foreach可以通过回调得第三个参数直接操作原数组实现值得修改

 map的处理速度比forEach快，而且返回一个新的数组，方便链式调用其他数组新方法 

## 简述Es6中的箭头函数

箭头函数特点是写法简洁，没有自己的this，this是继承上下文得this，并且没有arguments， 且无法通过apply，bind，call来改变指向对象 ，不能使用super做父类继承，也不支持箭头函数实现构造函数，适用于简单的无内部引用的操作

## 事件运算符...用过吗？什么场景

1.展开剩余参数

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3)); // 输出：6
console.log(sum(1, 2, 3, 4, 5)); // 输出：15
```

2.用于数组的浅拷贝与克隆

```javascript
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

console.log(copiedArray); // 输出：[1, 2, 3]
```

3.用于数组的合并

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2];

console.log(mergedArray); // 输出：[1, 2, 3, 4, 5, 6]
```

4.伪数组转化为真数组 /配合set展开实现 数组去重

```javascript
 function add(a) {
      console.log(arguments)
      // 利用...转为真数组
      const res = [...arguments]
      console.log(res)
    }
    add(1, 2, 3, 4, 5, 6, 7, "12", "254s")
    //...配合set实现数组去重
    let arr = [1, 2, 2, 3, 3, 3, 4, 5, 5, 5, 66, 66]
    arr = [...new Set(arr)]
    console.log(arr)
```

## 什么是闭包

闭包就是一个函数A return其内部的函数b  被return出去的函数b可以在外部访问函数A中定义的变量，此时这个变量在a函数外部只能通过b访问，闭包形成的原理是作用域链，当前作用域可以访问上级作用域的内容，闭包可以使得函数A执行后变量不会被销毁，实现在函数外部访问函数内部的变量，缺点是垃圾回收器不会将闭包中的变量销毁，因此会造成内存泄漏，内存泄漏多了会导致内存溢出（可以实现一个组件中使用的倒计时的计时器看一下）

```javascript
function outer() {
  let count = 0; // 外部函数中的变量

  function inner() { // 内部函数
    count++; // 内部函数访问外部函数的变量
    console.log("计数器的值是:", count);
  }

  return inner; // 返回内部函数
}

const counter = outer(); // 调用外部函数，得到闭包
counter(); // 输出: 计数器的值是: 1
counter(); // 输出: 计数器的值是: 2
counter(); // 输出: 计数器的值是: 3
```



## JS中的变量提升

js中的变量提升指的是js中的变量和函数声明会被移动到作用域顶部的行为，即在代码执行之前将var声明的变量和函数移动到当前代码的顶部，但是变量提升只是声明的提升，赋值并不会提升，对变量提升后但是还未赋值的变量访问其值是undefined，对于let和const不会产生变量提升，但是存在暂时性死区的问题。即在初始化前访问let和const声明的变量会报错

## JS中this的指向问题

JavaScript中`this`的指向规则因函数类型不同而显著区分：

**普通函数**的`this`在运行时动态绑定，取决于调用方式：

1. **默认绑定**：独立调用时，非严格模式指向`window`，严格模式为`undefined`；
2. **隐式绑定**：通过对象调用（如`obj.fn()`），`this`指向调用对象；
3. **显式绑定**：通过`call`/`apply`/`bind`强制指定`this`；
4. **new绑定**：作为构造函数时，`this`指向新创建的实例。

**箭头函数**的`this`为词法绑定（静态），在定义时继承外层作用域的`this`，且无法通过调用方式或`call`/`bind`修改：

1. 始终与外层函数（或全局）的`this`一致，常用于需要固定`this`的场景（如回调）；
2. 不可作为构造函数，无`prototype`属性；
3. 在类或对象方法中使用时需谨慎，可能因继承外层`this`导致预期外的行为（如类方法应避免使用箭头函数，除非显式绑定实例）。

**关键区别**：普通函数的`this`是动态上下文，箭头函数的`this`是静态词法环境，设计时需根据场景选择以规避指向错误。

## call apply bind 

call立即调用函数，改变this的指向，逐个传递参数

```javascript
function.call(thisArg, arg1, arg2, ...)
```

apply立即调用函数，改变this的指向，以数组的形式传递参数

```javascript
function.apply(thisArg, [argsArray])
```

bind逐个传递参数，返回一个函数，调用返回的函数，this的指向才改变，在不同的场景下用不同的改变this指向的方法

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

## new的过程会发生什么

1.在堆上开辟存储空间，创建一个新的空对象

2.将对象的_proto_ 指向构造函数的prototype，这样新对象就可以访问构造函数原型对象的属性和方法

3.改变构造函数中this的指向，this此时指向新创建的对象

4.构造函数如果没有返回值或者返回值为基本数据类型，此时new的返回值是新创建的对象，否则返回值的构造函数返回的对象

## async和defer的区别与作用

默认html文件的加载都是同步执行的，当浏览器加载到script部分，会停下来加载js文件，由于js是单线程的会阻塞文档的加载，在js加载完毕后才能继续加载文档，而defer和async的出现都是为了实现异步加载script脚本，defer会保证异步执行js文件加载和文档加载，并且在文档加载完毕后才执行js脚本，适合于需要操作dom的脚本，而async的异步加载会在js加载完毕后立即执行js脚本，此时操作dom有可能产生问题， 使用 async 适用于不需要考虑脚本执行顺序且可以异步加载的场景。 使用 defer 适用于需要在页面解析完成后按顺序执行的场景。 

## 简述Promise

 Promise是异步编程的一种解决方案，用于解决回调地狱问题，让代码可读性更高，更利于维护。 使用方法： Promise有三种情况fulfilled/resolved(成功)、rejected(失败)、pending(执行中)。 Promise通过new Promise()将构造函数实例化，Promise构造函数接收一个函数作为参数，这个函数有两个参数resolve，reject，这两个参数也是方法，成功调用resolve()，失败调用reject()，实例创建完成后，可以使用then方法指定成功或者失败的回调函数，也可以用catch捕获失败，then和catch最后也是返回promise对象，所以可以链式调用。  promise.all(iterable)：iterable是由多个promise实例组成的可迭代对象（如Array, Map, Set)，当iterable中的promise实例都完成(resolved)返回所有成功的结果组成的数组，只要有一个回调执行失败，then是不会执行的，则在catch中回调第一个失败的结果。 promise.race(iterable)：只要iterable中的其中一个promise实例resolved或者rejected，返回的promise就会resolved或者rejected

## 简述js中的异步，怎么实现异步

JS中的异步指的是程序中的某些耗时操作不会立即执行，而是在其他代码运行过程中的某个时刻完成，不会阻塞主线程的执行，提高程序的响应速度，比如网络请求，定时器等情况，js中实现异步最早是通过回调函数，在一个函数中传入另一个函数作为参数，实现异步操作，后面引入了promise实现异步操作，支持链式调用，解决了回调函数地狱的问题，现在引入了语法糖async await 将promise 实现的异步代码，看起来像同步代码一样书写，但实际上仍然是异步执行的。 

## Cookie，LocalStorage，SessionStorage

三者都是浏览器的本地存储，cookie一般由服务端写入，而localstorage，sessionstorage一般由前端直接写入，三者的生命周期不同，cookie的生命周期由服务端写入的时候就决定好了，而locastorage只要用户不清除浏览器缓存就一直存在，sessionstorage在页面关闭的时候就清除了，三者的容量也不同，cookie一般只有4kb，而localstorage和sessionstorage有5mb，三者都遵循同源的原则，只有sessionstorage限制同一个页面， 在给后端发送http请求时，会携带cookie里面的数据，但是另外两个不会。应用场景：cookie常用于登录的时候存储SessionId和token，localStorage常用于存储不易变动的数据，减轻服务器压力，sessionStorage可以用来检测用户是否刷新进入页面   

## 实现可过期的LocalStorage   

分两种，

一种是惰性删除，存储对象时采用两个key与value，一对存储信息，一对存储当前对象的存储时间，当下次访问这个对象时，判断此时key对应的有效时间与当前时间相比是否过期，过期就清除localstorage

第二种是定时删除，每隔一段时间执行一次删除操作，通过控制定时删除的定时器事件，减少对资源的占用

## token可以放在cookie中吗

token可以放在cookie中，但是不推荐，因为cookie会自动携带token发送请求，尽管方便了前端发送请求，但是存在CRSF(跨域请求头伪造)风险，在受到恶意攻击时，执行用户并不想执行的操作，存在安全隐患，一般将token存储在本地的localstroge中，一方面存储空间大，可以存储长token，前端手动添加token到请求中， 服务端接受到请求后，需要验证请求头里的token。如验证成功则返回对应的数据 

## axios中的拦截器作用

axios拦截器分为请求拦截器和响应拦截器：
请求拦截器 在请求发送之前进行必要操作处理，比如为每个请求带上响应的参数（token，时间戳等）。
响应拦截器 在请求响应之后对响应体的处理，通常是数据统一处理，也常用来判断登录失效（token是否过期，重新获取token等）还可以判断返回的状态码进行错误处理。



 axios的拦截器应用场景：请求拦截器用于在接口请求之前做的处理，比如为为每个请求带上相应的参数（token、时间戳等），响应拦截器用在在接口响应之后做的处理，比如对返回的状态进行判断（token是否过期）。 axios提供了一个API：拦截器，有请求拦截器、响应拦截器。拦截器的原理：创建一个chn数组，数组中保存了拦截器相应的方法以及dispatchRequest（dispatchRequest这个函数调用才会真正的开始下发请求），把请求拦截器的方法放在chn数组中dispatchRequest的前面，把响应拦截器的方法放在chn数组中dispatchRequest的后面，把请求拦截器和响应拦截器forEach将他们分别unshift（插入在数组头部），push到chn数组中，为了保证他们的执行顺序，需要使用promise，一出队列的方式对chn数组中的方法挨个执行。 Axios是一个基于promise的HTTP库，可以用在浏览器和nodejs中，在浏览器中创建XMLHttpRequest，在nodejs则创建htt皮请求，支持promiseAPI，可拦截请求和响应，可转换请求数据和响应数据，可取消请求，可自动转换json数据，客户端支持防御XSRF

## fetch

 fetch是http请求方式的一种；是xmlhtmlrequest的一种替代，fetch是原生js，不使用xmlhtmlrequest对象。fetch（）方法通过返回一个promise解析response来自request显示状态（成功与否） 基于Promise实现，语法简洁，但是兼容性不好不支持IE，无法检测请求进度，没有提供中断请求的方法   

## 保持前后端实时通信的方法

 **轮询**：客户端和服务端会一直连接，每隔一段时间就会询问一次，连接数会很多，耗流量、耗cpu利用率。 **长轮询**：是对轮询的改进版，客户端发送http请求到服务器，如果没有消息返回，就一直等待，直到有返回给客户端，一定程度上减少了网络宽带和cpu的利用率。 **iframe**：利用iframe的src属性在服务器和客户端建立一条长连接，通过服务器传输数据给客户端实时更新数据。 **websocket**：类似于socket的TCP长连接，一旦websocket连接建立之后，后续都是帧序列进行数据传输。 **SSE**：是建立在浏览器和服务器之前的连接通道，然后服务器像浏览器推送信息，因为是单向通道，只能服务器向浏览器发送数据。

## 浏览器输入url后发生了什么

 1.URL解析：判断浏览器输入的是搜索内容还是URL；2、查找缓存：如果能找到缓存则直接返回页面，如果没有缓存则需要发送网络请求页面；3、DNS域名解析；4、三次握手建立TCP连接；4.https需要四次握手建立https链接 5、发起HTTP请求；6、服务器响应并返回结果；7、通过四次挥手释放TCP连接；8、浏览器渲染；9、js引擎解析

## 浏览器是如何渲染页面的

 1.HTML被HTML解析器解析成DOM树。 2、CSS被CSS解析器解析成CSS规则树。 3、浏览器会将CSS规则树附着在DOM树上，并结合两者生成渲染树Render Tree。 4、生成布局（flow），浏览器通过解析计算出每一个渲染树节点的位置和大小，在屏幕上画出渲染树的所有节点。 5、将布局绘制（paint）在屏幕上，显示出整个页面

## 说一下重绘和重排区别，如何避免

 重排：当一个元素的位置、尺寸等发生改变的时候 浏览器需要重新计算该元素的几何属性并且摆放到正确的位置的过程就叫做重排。一般像页面初次渲染、带有动画的元素、添加/删除功能、图片放大缩小、浏览器窗口发生改变的时候都会触发重排。 重绘：当一个元素的外观、样式发生改变而布局不会改变，重新绘制的过程叫做重绘。 重排必定会触发重绘，而重绘则不一定会触发重排。一般来说，重排对性能的损耗更多一点  要避免重绘和重排，可以采取以下措施：

1. 减少DOM操作，批量进行DOM修改，而不是频繁地单独操作。
2. 使用CSS类而不是直接操作样式，通过添加或移除CSS类来改变样式。
3. 避免频繁修改影响布局的属性，如宽度、高度等。
4. 使用`transform`和`opacity`进行动画，这些属性不会触发重排。
5. 避免使用表格布局，尽量使用`div`和CSS进行布局。
6. 使用`will-change`提示浏览器元素可能会发生变化，让浏览器提前进行优化。
7. 减少使用JavaScript进行动画，使用CSS动画更高效。
8. 避免频繁读取布局信息，将这些值缓存起来。

## 浏览器的垃圾回收机制

 浏览器的垃圾回收机制，根据数据的存储方式分为栈垃圾回收和堆垃圾回收 ，当一个函数执行结束之后，JavaScript引擎会通过销毁函数保存栈中的执行上下文，遵循先进后出的原则 ，堆垃圾回收的机制有两种，一种是标记清除法，一种是引用计数法， 标记清除算法就是执行前将所有的变量打上标记，执行完成后未被打上标记的变量就会当做垃圾回收。浏览器会隔一段时间进行一次标记清除，标记清除算法的缺点：被释放的掉的内存空间是不连续的，之前一直占据内存的变量隔开，导致内存空间不连续，会出现分配不一的问题。因此也出现了标记-整理算法，将不连续的存储空间压向一端缺点是效率比较低，引用计数算法：就是对对象的引用次数进行增加或者减少，如果引用次数变为0，那么该对象分配的内存空间立即就会被清除掉。缺点就是会出现相互引用的情况。会导致对象一直被引用无法被清除 

## 事件循环Event Loop

 浏览器的事件循环：执行js代码的时候，遇见同步任务，直接推入调用栈中执行，遇到异步任务，将该任务挂起，等到异步任务有返回之后推入到任务队列中，当调用栈中的所有同步任务全部执行完成，将任务队列中的任务按顺序一个一个的推入并执行，重复执行这一系列的行为。  异步任务又分为宏任务和微任务。 宏任务：任务队列中的任务称为宏任务，每个宏任务中都包含了一个微任务队列。 微任务：等宏任务中的主要功能都完成后，渲染引擎不急着去执行下一个宏任务，而是执行当前宏任务中的微任务 宏任务包含：执行script标签内部代码、setTimeout/setInterval、ajax请求、postMessageMessageChannel、setImmediate，I/O（Node.js） 微任务包含：Promise、MutonObserver、Object.observe、process.nextTick（Node.js）  

## 什么是跨域，如何解决跨域问题

 跨域：受浏览器同源策源（即协议，域名，端口号必须一致是浏览器的一种安全模式）的影响不能执行其他网站的脚本 解决的办法：前端：1.利用script中src属性发送jsonp请求但是这种方式只支持get请求无法解决其他的请求类型 2.前端配置一个代理服务器（proxy）代替浏览器去发送请求:因为服务器与服务器之间是可以通信的不受同源策略的影响。3. 服务端：服务端通过配置cors来解决跨域，配置响应头：setHeader(access-control-allow-origin，对应的域名) 

##   xhr的使用

（1）创建异步对象，即 XMLHttpRequest 对象。 （2）使用 open 方法设置请求参数。open(method, url, async)。参数解释：请求的方法、请求的 url、是否异步。第三个参数如果不写，则默认为 true。 （3）注册事件：注册 onreadystatechange 事件，状态改变时就会调用。如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。（4）发送请求：send()。  （5）服务端响应，获取返回的数据

## 原型与原型链

1.原型:函数都有prototype属性,称之为原型，也称为原型对象原型可以放一些属性和方法，共享给实例对象使用
原型可以做继承
2.原型链:对象都有 proto 属性,这个属性指向它的原型对象,原型对象也是对象,也有_proto 属性,指向原型对象的原型对象,这样一层一层形成的链式结构称为原型链，最顶层找不到则返回 null

## 深拷贝与浅拷贝

**浅拷贝（Shallow Copy）**：仅复制对象的**顶层属性**，若属性为引用类型（如对象、数组），则拷贝其**内存地址**，新旧对象**共享嵌套数据**。
**深拷贝（Deep Copy）**：递归复制对象的所有层级属性，生成完全独立的副本，新旧对象**无共享数据**。

  **`Object.assign()`**

 **展开运算符（`...`）**： 

深拷贝

 **`JSON.parse(JSON.stringify())`** 

使用json转化深拷贝的问题

**核心问题**

 `Date` 对象会被序列化为 **ISO 格式字符串**，反序列化后**无法还原为 Date 实例**。 

`RegExp`、`Error` 等对象会被序列化为 **空对象**，失去原有属性和功能。 

 `JSON.stringify()` 对某些特殊数值（如 `NaN`、`Infinity`）会转换为 `null`。

 拷贝后的对象 **继承自 Object 而非原构造函数**，导致原型链方法不可用  



循环引用问题：深拷贝需处理对象内部循环引用（如 `obj.self = obj`），否则会导致栈溢出。

特殊类型处理：日期、正则表达式、函数等需在深拷贝中单独处理。

## for of 与 for in 的区别

for in 用于遍历对象中的键值对，还会遍历到原型链上的可枚举属性，for of 用于遍历可迭代对象的key 和 value，是es6中新引入的语法，避免了for of中潜在的问题

### 强缓存与协商缓存


强缓存 vs. 协商缓存
强缓存：基于 Cache-Control 或 Expires，浏览器直接使用本地缓存，不发请求。适合静态资源，减少服务器压力。
协商缓存：浏览器通过 If-None-Match 或 If-Modified-Since 向服务器验证资源是否更新。若未更新，返回 304，使用本地缓存；若更新，返回新资源。适合动态或频繁更新的资源。
ETag vs. Last-Modified
ETag：基于资源内容生成的唯一标识符，更精确地标识资源版本。优先级高于 Last-Modified，适合动态或频繁更新的资源。
Last-Modified：基于资源最后修改时间的时间戳，精度到秒，适合静态资源，开销小。
前端重点
强缓存：优化加载速度，减少请求，适合前端静态资源（如图片、CSS、JS）。
协商缓存：确保资源更新，适合前后端分离架构中，后端动态生成的前端资源。
ETag：更可靠，适合前后端协作中，需要精确控制缓存的场景。
Last-Modified：简单高效，适合静态资源，减少服务器计算开销。