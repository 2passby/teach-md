 



## js手写题

## 实现数组转树的两种方法

### 1.暴力递归

```javascript
 const testdata = [
      { id: "01", name: "张⼤⼤", pid: null, job: "项⽬经理" },
      { id: "02", name: "⼩亮", pid: "01", job: "产品leader" },
      { id: "03", name: "⼩美", pid: "01", job: "UIleader" },
      { id: "04", name: "⽼⻢", pid: "01", job: "技术leader" },
      { id: "05", name: "⽼王", pid: "01", job: "测试leader" },
      { id: "06", name: "⽼李", pid: "01", job: "运维leader" },
      { id: "07", name: "⼩丽", pid: "02", job: "产品经理" },
      { id: "08", name: "⼤光", pid: "02", job: "产品经理" },
      { id: "09", name: "⼩⾼", pid: "03", job: "UI设计师" },
      { id: "10", name: "⼩刘", pid: "04", job: "前端⼯程师" },
      { id: "11", name: "⼩华", pid: "04", job: "后端⼯程师" },
      { id: "12", name: "⼩李", pid: "04", job: "后端⼯程师" },
      { id: "13", name: "⼩赵", pid: "05", job: "测试⼯程师" },
      { id: "14", name: "⼩强", pid: "05", job: "测试⼯程师" },
      { id: "15", name: "⼩涛", pid: "06", job: "运维⼯程师" },
    ]
    //暴力递归实现数组转树
    const arrayToTree = (arr, pid) => {
      return arr.reduce((pre, cur) => {
        if (cur.pid === pid) {
          const children = arrayToTree(arr, cur.id)
          if (children.length) {
            cur.children = children
          }
          pre.push(cur)
        }
        return pre
      }, [])
    }
    let tree = arrayToTree(testdata, null)
    console.log(tree)
```

### 2.哈希映射实现

```javascript

    //哈希表实现数组转树
    const arrayToTreeHash = (arr) => {
      let tree = []
      let map = new Map()
      arr.forEach((item) => {
        map.set(item.id, { ...item, children: [] })
      })
      arr.forEach((item) => {
        const node = map.get(item.id)
        const parentNode = map.get(item.pid)
        if (parentNode) {
          parentNode.children.push(node)
        } else {
          tree.push(node)
        }
      })
      return tree
    }
    let tree2 = arrayToTreeHash(testdata)
    console.log(tree2)
```

## 树转数组的两种方法

### 递归实现

```javascript
 	//树转数组
    const TreeToArray = (tree) => {
      return tree.reduce((prev, cur) => {
        if (!cur.children) {
          prev.push(cur)
        } else {
          let subList = TreeToArray(cur.children)
          delete cur.children
          prev.push(cur, ...subList)
        }
        return prev
      }, [])
    }
```

### 队列bfs遍历实现

```javascript
 //树转数组
    const treetoarray = (tree) => {
      let qu = []
      let res = []
      qu.push(tree[0])
      while (qu.length) {
        let top = qu.shift()
        if (top.children) { 
          for (let i = 0; i < top.children.length; i++) {
            qu.push(top.children[i])
          }
        }
            //删除子项目，子项目全加入到队列中了
        delete top.children
        res.push(top)
      }
      return res
    }
```

## 防抖与节流

事件频繁触发时，减少事件的执行次数

防抖：只执行最后一次（input监听输入）

节流：有规律的执行（拖拽，scroll）

### 实现防抖

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>实现防抖效果</h1>
    <input type="text" />
  </body>
  <script>
    //     浏览器 → 闭包函数
    // 事件触发时，浏览器调用 debouncedHandler(e)，传入 e。

    // 闭包函数 → arguments
    // 闭包函数通过 arguments 隐式捕获 e（无需显式声明参数）。

    // arguments → fn
    // 通过 fn.call(this, ...arguments) 将 e 透传给用户函数 fn。
    const oinput = document.querySelector("input")
    const debounce = (fn) => {
      let timer = null

      return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn.call(this, ...arguments)
          console.log([...arguments])
        }, 500)
      }
    }
    oinput.addEventListener(
      "keyup",
      debounce(function (e) {
        console.log(e.target.value)
      })
    )
  </script>
</html>

```

#### 立刻触发的防抖

```javascript
function debounce(fn, delay, immediate = false) {
      let timer = null
      let flag = false
      return function (...args) {
        if (timer) clearTimeout(timer)
        if (immediate && !flag) {
          fn.call(this, ...args)
          flag = true
        } else {
          timer = setTimeout(() => {
            fn.call(this, ...args)
            flag = false
          }, delay)
        }
      }
    }
```

### 实现节流

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: pink;
    }
  </style>
  <body>
    <div draggable="true"></div>
  </body>
  <script>
    const throttle = (fn) => {
      let timer = null
      return function () {
        if (timer) return
        timer = setTimeout(() => {
          fn.call(this, ...arguments)
          timer = null
        }, 150)
      }
    }
    const odiv = document.querySelector("div")
    odiv.addEventListener(
      "drag",
      throttle(function (e) {
        console.log(e.clientX)
      })
    )

	//时间戳实现的节流
    function throttle1(fn, delay) {
      let last = 0
      const _throttle = function (...args) {
        const now = new Date().getTime()
        if (now - last >= delay) {
          fn.apply(this, args)
          last = now
        }
      }
      return _throttle
    }
	//保证尾缘触发的节流
	  function throttle(fn, delay) {
        let last = 0,
        timer = null // last: 上一次执行的时间戳，timer: 定时器引用
      return function (...args) {
        // 返回一个新的函数，这个函数会被事件监听器调用
        const now = Date.now() // 获取当前时间戳
        const remaining = delay - (now - last) // 计算剩余时间：延迟时间 - 已经过的时间
        if (remaining <= 0) {
          // 如果剩余时间小于等于0，说明已经过了延迟时间，可以执行函数
          if (timer) clearTimeout(timer) // 清除定时器（如果存在）
          fn.apply(this, args) // 执行传入的函数，并传递上下文和参数
          last = now // 更新上一次执行的时间戳为当前时间
        } else if (!timer) {
          // 如果剩余时间大于0，并且定时器不存在
          timer = setTimeout(() => {
            // 设置一个定时器，在剩余时间后执行
            fn.apply(this, args) // 执行传入的函数，并传递上下文和参数
            last = Date.now() // 更新上一次执行的时间戳为当前时间
            timer = null // 清除定时器引用
          }, remaining) // 定时器延迟时间为剩余时间
        }
      }
    }
  </script>
</html>

```

## 实现Promise.all

```javascript
function mypromiseall(promises) {
      try {
        let newpromises = Array.from(promises)
        let len = newpromises.length
        let res = []
        let completed = 0

        return new Promise((resolve, reject) => {
          if (len === 0) resolve(res)
          for (let i = 0; i < len; i++) {
            Promise.resolve(newpromises[i])
              .then((data) => {
                res[i] = data
                completed++
                if (completed === len) resolve(res)
              })
              .catch((err) => {
                reject(err)
              })
          }
        })
      } catch (err) {
        return Promise.reject(err)
      }
    }
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve("First"), 1000)),
      new Promise((resolve) => setTimeout(() => resolve("Third"), 500)),
      new Promise((resolve) => setTimeout(() => resolve("fouth"), 500)),
    ]
    mypromiseall(promises)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err)) 
```

## 实现 Instanceof判断类型

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    // 实现instanceof判断类型
    function myinstanceof(object, target) {
      if (typeof target !== "function") {
        throw new TypeError("Right-hand side of 'myinstanceof' is not callable")
      }

      if (typeof object !== "object" || object === null) return false
      let object_proto = object.__proto__
      let target_prototype = target.prototype
      while (true) {
        if (object_proto === null) return false
        if (object_proto === target_prototype) return true
        object_proto = object_proto.__proto__
      }
    }
    let arr = [1, 2, 3]
    console.log(myinstanceof({}, Object)) // true
    const arr = []
    console.log(myinstanceof(arr, Array)) // true
    console.log(myinstanceof(arr, Object)) // true
    function Test() {}
    const test = new Test()
    console.log(myinstanceof(test, Test)) // true
    console.log(myinstanceof(test, Object)) // true
    console.log(myinstanceof(5, Number)) // false（原始类型）
    console.log(myinstanceof(new Number(5), Number)) // true（包装对象）
    function Parent() {}
    function Child() {}
    Child.prototype = Object.create(Parent.prototype)
    const child = new Child()
    console.log(myinstanceof(child, Parent)) // true

    try {
      myinstanceof({}, {})
    } catch (e) {
      console.log(e.message)
    }
    console.log(myinstanceof([1, 2], Array)) // true
    console.log(myinstanceof({}, Object)) // true
    console.log(myinstanceof(123, Number)) // false（原始值返回 false）
    console.log(myinstanceof(new Number(123), Number)) // true
  </script>
</html>

```

## 函数柯里化

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    // 函数柯里化可以实现参数复用和多参数转化为单参数多次调用

    //一次参数复用
    function urlChange(head) {
      return function urlRepeate(content, footer) {
        return `${head}${content}${footer}`
      }
    }
    const urlRe = urlChange("https://www.")
    console.log(urlRe("baidu", ".com"))
    //多次参数复用
    function urlChange2(head) {
      return function UrlRepeate(content) {
        return function urlend(footer) {
          return `${head}${content}${footer}`
        }
      }
    }
    const curry_url = (head) => {
      return (content) => {
        return (footer) => {
          return `${head}${content}${footer}`
        }
      }
    }
    //多次复用测试
    const curry_url2 = (head) => (content) => (footer) =>
      `${head}${content}${footer}`

    console.log(urlChange2("https://www.")("xiaohongshu")(".com"))
    console.log(curry_url("https://www.")("csdn")(".com"))
    console.log(curry_url2("https://www.")("douban")(".com"))

    //实现通用柯里化函数

    const curry = (fn, ...args) => {
      // 当前拼接的参数足够执行fn所需的参数就调用fn
      if (args.length >= fn.length) {
        return fn.call(this, ...args)
      }
      //注意这里箭头函数的使用 返回新函数接受参数，递归调用curry 直到满足递归出口
      return (...rest) => {
        return curry(fn, ...args, ...rest)
      }
    }

    // 测试
    const add = (x, y, z) => x + y + z
    console.log(add(2, 3, 4))

    const curry_add = curry(add)
    console.log(curry_add(1, 2)(3))
    console.log(curry_add(1)(5)(7))
  </script>
</html>

```

## 实现对象深拷贝

```javascript

 	const obj = {
      name: "123",
      age: 12,
        
      colors: ["red", "blue", "green"],
      friends: {
        number: "1783706",
        home: "jiaxian",
        group: {
          id: 1,
        },
      },
    }
  function deepclone(obj) {
      if (obj instanceof Date) return new Date(obj)
      if (obj instanceof RegExp) return new RegExp(obj)
      if (obj instanceof Function)
        return function (...args) {
          obj.call(this, ...args)
        }

      if (obj === null || typeof obj !== "object") return obj
      let newobj = Array.isArray(obj) ? [] : {}
      for (let key in obj) {
          //过滤掉原型链上的属性
        if (obj.hasOwnProperty(key)) {
          newobj[key] = deepclone(obj[key])
        }
      }
      return newobj
    }

```

## 数组扁平化（flat）

```javascript
<script>
    let arr = [
      1,
      2,
      3,
      [1, 2, 3, 4, 5],
      [1, [1, 2, 3, [1, 4]]],
      5,
      6,
      7,
      8,
      9,
      7,
      1,
      0,
      2,
    ]
    Array.prototype.flatten = function () {
      let flat = []
      for (let v of this) {
        if (Array.isArray(v)) {
          flat = flat.concat(v.flatten())
        } else {
          flat.push(v)
        }
      }
      return flat
    }
    const res = arr.flatten()
    console.log(res)
  </script>
```

##  对象扁平化（flat）

```javascript
 const obj = {
      a: 1,
      b: {
        c: 2,
        d: { e: 3 },
      },
      f: [4, 5],
    }
    function objectFlat(obj = {}) {
      let res = {}
      function flat(obj, preKey) {
        Object.entries(obj).forEach(([key, val]) => {
          let newkey = preKey ? `${preKey}.${key}` : key
          if (typeof val === "object") {
            flat(val, newkey)
          } else {
            res[newkey] = val
          }
        })
      }
      flat(obj)
      return res
    }

    Object.prototype.flatten = function (oldkey) {
      let res = {}
      Object.entries(this).forEach(([key, value]) => {
        let newkey = oldkey ? `${oldkey}.${key}` : key
        if (typeof value === "object") {
          let newobj = value.flatten(newkey)
          res = { ...res, ...newobj }
        } else {
          res[newkey] = value
        }
      })
      return res
    }
    console.log(objectFlat(obj))
```



## new运算符实现

```javascript
 <script>
    function Person(name, age) {
      this.name = name
      this.age = age
    }
    function myNew(fn, ...args) {
      if (Object.prototype.toString.call(fn) !== "[object Function]") {
        return "Error in params"
      }
      const obj = {}
      obj.__proto__ = fn.prototype
      let ret = fn.call(obj, ...args)
      return ret instanceof Object ? ret : obj
    }
    const hyd = myNew(Person, "hyd", 13)
    Person.prototype.sayinfo = function () {
      console.log(this.name)
      console.log(this.age)
    }
    hyd.sayinfo()
  </script>
```

##  手写红绿灯转化-promise



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let timer = null
    function red() {
      console.log("red")
      return new Promise((reslove) => {
        timer = setTimeout(reslove, 3000)
      })
    }
    function green() {
      console.log("green")
      return new Promise((reslove) => {
        timer = setTimeout(reslove, 2000)
      })
    }
    function yellow() {
      console.log("yellow")
      return new Promise((reslove) => {
        timer = setTimeout(reslove, 1000)
      })
    }
    function trafficSignal() {
      return red()
        .then(() => green())
        .then(() => yellow())
        .then(() => trafficSignal())
    }

    function trafficStart() {
      trafficSignal()
    }
    function trafficStop() {
      clearTimeout(timer)
    }

    trafficStart()
    setTimeout(() => {
      trafficStop()
    }, 13000)
  </script>
</html>

```
## 异步任务调度队列
```javascript
 class AsyncQueue {
            constructor(maxConcurrent) {
                this.maxConcurrent = maxConcurrent; // 最大并发数
                this.running = 0; // 当前正在运行的任务数
                this.queue = []; // 任务队列
            }

            addTask(task) {
                return new Promise((resolve, reject) => {
                    const runTask = async () => {
                        try {
                            this.running++;
                            const result = await task(); // 执行任务
                            resolve(result); // 任务完成，返回结果
                        } catch (error) {
                            reject(error); // 任务失败，抛出错误
                        } finally {
                            this.running--; // 任务结束，减少运行数
                            this.processQueue(); // 处理队列中的下一个任务
                        }
                    };

                    // 如果当前运行的任务数小于最大并发数，直接运行任务
                    if (this.running < this.maxConcurrent) {
                        runTask();
                    } else {
                        // 否则，将任务加入队列
                        this.queue.push(runTask);
                    }
                });
            }

            processQueue() {
                // 检查队列中是否有任务，并且当前运行的任务数是否小于最大并发数
                while (this.queue.length > 0 && this.running < this.maxConcurrent) {
                    const nextTask = this.queue.shift(); // 取出队列中的下一个任务
                    nextTask(); // 运行任务
                }
            }
        }
```


## 发布者订阅者模式实现
  ```javascript
   //手写实现发布者订阅者模式

        class publish {
            constructor() {
                this.list = {}
            }
            emit(key, ...args) {
                if (this.list[key] && this.list[key].length > 0) {
                    for (let callback of this.list[key]) {
                        callback.call(this, ...args)
                    }
                }
                else {
                    console.log('notfind-function')
                }
            }
            on(key, callback) {
                if (this.list[key]) {
                    this.list[key].push(callback)
                }
                else {
                    this.list[key] = []
                    this.list[key].push(callback)
                }
            }
            off(key, callback) {
                let index = this.list[key].indexOf(callback)
                if (index !== -1) {
                    this.list[key].splice(index, 1)
                }
            }
        }
        const vue = new publish()
        const fn = (data) => {
            console.log("传入的数据", data)
        }
        vue.on('hyd', fn)
        vue.emit('hyd', 'dacongming')
        vue.off('hyd', fn)
        vue.emit('hyd', 'dacongming')

 
 ```

 ## 扁平对象转嵌套对象


         ```javascript
  //转化为嵌套对象
        let myobj = { "a.b.c": 123, "a.c": 456 }
        function nestobj(myobj) {
            let obj = {}
            for (let key in myobj) {
                if (myobj.hasOwnProperty(key)) {
                    let current = obj
                    let arr = key.split('.')
                    let last = arr.length - 1
                    arr.forEach((item, index) => {
                        if (index === last) {
                            current[item] = myobj[key]
                        }
                        else {
                            if (!current[item]) {
                                current[item] = {}
                            }
                            current = current[item]
                        }
                    })
                }
            }
            return obj
        }
        console.log(nestobj(myobj))
 ```

## 千分位格式化小数
```javascript
 const number = 12343.96
        function fomat(number) {
            let index = String(number).indexOf('.')
            let arr = String(number).split('.')
            let pos
            let oparr = []
            if (index === -1) {
                pos = number.length - 3
                oparr = arr
            }
            else {
                pos = arr[0].length - 3
                oparr = arr[0].split('')
            }
            while (pos >= 0) {
                oparr.splice(pos, 0, ',')
                pos -= 3
            }
            console.log('oparr', oparr)

            return arr[1] ? oparr.join('') + '.' + arr[1] : oparr.join('')
        }
        console.log('format', fomat(number))
        console.log('format', fomat(123456789))
        console.log('format', fomat(654321))
        console.log('format', fomat(1314520.134))
        console.log('format', fomat(15679.24))
        console.log('format', fomat(16579.46))
```

## 手写实现call函数

```javascript

Function.prototype.myCall = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall is not a function');
  }
  context.tempFunc = this;
  const result = context.tempFunc(...args);
  delete context.tempFunc;
  return result;
};

Function.prototype.mybind = function(context,...args){
  return function(...callargs){
    return this.myCall(context,...args,...callargs)
  }
}
```