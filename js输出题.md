## 看输出
```javascript
 //看执行顺序的题目
        //执行顺序
        function call() {
            async function async1() {
                console.log('async1 start')
                await async2();
                console.log('async1 end')
            }
            async function async2() {
                console.log('async2')
            }
            console.log('script start')
            setTimeout(function () {
                console.log('setTimeout')
            }, 0)
            async1();
            new Promise(
                function (resolve) {
                    console.log('promise1')
                    resolve();
                })
                .then(
                    function () {
                        console.log('promise2')
                    })

        }
```
await 会延迟执行后面的代码	✅ 是的，但前提是 await 的是一个返回 Promise 的表达式
await 后面的函数会“异步执行”	❌ 不会，await 后面的函数是立即执行的
async 会把整个函数变成异步	✅ 是的，但函数内部的执行顺序仍然是同步优先，遇到 await 才暂停

2
3
7
9
4
6
5
8
1