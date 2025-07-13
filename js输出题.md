## 看输出

```javascript
//看执行顺序的题目
//执行顺序
function call() {
  async function async1() {
    console.log("async1 start")
    await async2()
    console.log("async1 end")
  }
  async function async2() {
    console.log("async2")
  }
  console.log("script start")
  setTimeout(function () {
    console.log("setTimeout")
  }, 0)
  async1()
  new Promise(function (resolve) {
    console.log("promise1")
    resolve()
  }).then(function () {
    console.log("promise2")
  })
}
```

await 会延迟执行后面的代码 ✅ 是的，但前提是 await 的是一个返回 Promise 的表达式
await 后面的函数会“异步执行” ❌ 不会，await 后面的函数是立即执行的
async 会把整个函数变成异步 ✅ 是的，但函数内部的执行顺序仍然是同步优先，遇到 await 才暂停

2
3
7
9
4
6
5
8
1

## 输出顺序 2

```javascript
console.log("script start")

setTimeout(() => {
  console.log("settimeout1")
}, 0)

Promise.resolve().then(() => {
  console.log("promise1")
})

console.log("script end")
```

console.log("script start")
console.log("script end")
console.log("promise1")
console.log("settimeout1")

## 输出顺序 2

```javascript
console.log("script start")

Promise.resolve()
  .then(function () {
    console.log("promise1")
    setTimeout(function () {
      console.log("setTimeout")
    }, 0)
  })
  .then(function () {
    console.log("promise2")
  })
console.log("hyd-start")
setTimeout(function () {
  console.log("setTimeout1")
}, 0)
```

## 输出 3

```javascript
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
}

async function async2() {
  console.log("async2")
}

console.log("script start")
setTimeout(() => console.log("setTimeout"))
async1()
new Promise((resolve) => {
  console.log("promise1")
  resolve()
}).then(() => console.log("promise2"))
console.log("script end")
```

## 输出 4

```javascript
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
}

async function async2() {
  console.log("async2")
  await async3()
  console.log("async2 end")
}

async function async3() {
  setTimeout(() => console.log("setTimeout in async3"), 0)
  console.log("async3")
}

console.log("script start")
setTimeout(() => console.log("setTimeout"))
async1()
new Promise((resolve) => {
  console.log("promise1")
  resolve()
}).then(() => console.log("promise2"))
console.log("script end")
```

console.log("script start")
console.log("async1 start")
console.log("async2")
console.log("async3")
console.log("promise1")
console.log("script end")
console.log("async2 end")
console.log("async1 end")
console.log("promise2"))
setTimeout(() => console.log("setTimeout"))
setTimeout(() => console.log("setTimeout in async3"), 0)

## 变量与作用域 题 1

```javascript
var a = 1
function test() {
  console.log(a) // ?
  var a = 2
  console.log(a) // ?
}
test()
console.log(a) // ?
```

## 变量与作用域 题 1

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // ?
  }, 0)
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(j) // ?
  }, 0)
}
```
