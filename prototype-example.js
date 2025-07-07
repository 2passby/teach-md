// ==================== 原型与原型链示例 ====================

// 1. 构造函数与原型
function Person(name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
}

// 在Person的原型上添加方法
Person.prototype.sayHello = function() {
  console.log(`你好，我是${this.name}，今年${this.age}岁`);
};

Person.prototype.species = "人类"; // 原型属性

// 创建实例
const person1 = new Person("张三", 25);
const person2 = new Person("李四", 30);

console.log("=== 1. 原型关系验证 ===");
console.log("Person.prototype === person1.__proto__:", Person.prototype === person1.__proto__);
console.log("person1.__proto__ === person2.__proto__:", person1.__proto__ === person2.__proto__);

// 2. 原型链查找过程
console.log("\n=== 2. 属性访问与原型链查找 ===");
console.log("person1.name:", person1.name); // 实例属性
console.log("person1.species:", person1.species); // 从原型获取
person1.sayHello(); // 从原型获取方法

// 3. 原型链层级展示
console.log("\n=== 3. 原型链层级结构 ===");
console.log("person1 对象本身的属性:");
console.log("- name:", person1.hasOwnProperty('name'));
console.log("- sayHello:", person1.hasOwnProperty('sayHello'));

console.log("\nperson1.__proto__ (Person.prototype):");
console.log("- sayHello:", Person.prototype.hasOwnProperty('sayHello'));
console.log("- species:", Person.prototype.hasOwnProperty('species'));

console.log("\nperson1.__proto__.__proto__ (Object.prototype):");
console.log("- toString:", Object.prototype.hasOwnProperty('toString'));

console.log("\nperson1.__proto__.__proto__.__proto__:");
console.log("原型链顶端:", person1.__proto__.__proto__.__proto__); // null

// 4. 原型链的完整路径
console.log("\n=== 4. 原型链完整路径演示 ===");
function tracePrototypeChain(obj, objName) {
  let current = obj;
  let level = 0;
  
  console.log(`\n${objName} 的原型链:`);
  
  while (current !== null) {
    if (level === 0) {
      console.log(`${level}. ${objName} 实例对象`);
      console.log(`   属性: name=${current.name}, age=${current.age}`);
    } else if (level === 1) {
      console.log(`${level}. Person.prototype`);
      console.log(`   方法: sayHello, 属性: species=${current.species}`);
    } else if (level === 2) {
      console.log(`${level}. Object.prototype`);
      console.log(`   方法: toString, valueOf, hasOwnProperty 等`);
    }
    
    current = Object.getPrototypeOf(current);
    level++;
  }
  
  console.log(`${level}. null (原型链终点)`);
}

tracePrototypeChain(person1, "person1");

// 5. 动态修改原型
console.log("\n=== 5. 动态修改原型 ===");
Person.prototype.getInfo = function() {
  return `姓名: ${this.name}, 年龄: ${this.age}, 种类: ${this.species}`;
};

console.log("添加新方法后，所有实例都可以使用:");
console.log("person1.getInfo():", person1.getInfo());
console.log("person2.getInfo():", person2.getInfo());

// 6. 继承示例 - 原型链继承
console.log("\n=== 6. 原型链继承示例 ===");

function Student(name, age, school) {
  Person.call(this, name, age); // 调用父构造函数
  this.school = school;
}

// 设置原型链继承
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// 添加学生特有的方法
Student.prototype.study = function() {
  console.log(`${this.name}正在${this.school}学习`);
};

const student1 = new Student("王五", 20, "清华大学");

console.log("学生实例的原型链:");
console.log("student1.name:", student1.name); // 来自Student构造函数
console.log("student1.species:", student1.species); // 来自Person.prototype
student1.sayHello(); // 来自Person.prototype
student1.study(); // 来自Student.prototype

// 7. 原型链查找的性能考虑
console.log("\n=== 7. 原型链查找过程模拟 ===");
function findProperty(obj, propName) {
  let current = obj;
  let steps = 0;
  
  console.log(`查找属性 "${propName}":`);
  
  while (current !== null) {
    steps++;
    if (current.hasOwnProperty(propName)) {
      console.log(`✓ 在第${steps}层找到: ${propName}`);
      return current[propName];
    }
    console.log(`✗ 第${steps}层未找到，继续向上查找...`);
    current = Object.getPrototypeOf(current);
  }
  
  console.log(`✗ 属性 "${propName}" 不存在`);
  return undefined;
}

findProperty(student1, "name");      // 第1层找到
findProperty(student1, "species");   // 第2层找到
findProperty(student1, "toString");  // 第3层找到
findProperty(student1, "notExist");  // 找不到

// 8. 原型污染演示（注意事项）
console.log("\n=== 8. 原型修改的影响 ===");
console.log("修改前:");
console.log("person1.species:", person1.species);
console.log("person2.species:", person2.species);

// 修改原型属性
Person.prototype.species = "智人";

console.log("修改Person.prototype.species后:");
console.log("person1.species:", person1.species);
console.log("person2.species:", person2.species);

// 实例属性会屏蔽原型属性
person1.species = "现代人";
console.log("给person1添加实例属性species后:");
console.log("person1.species:", person1.species); // 实例属性
console.log("person2.species:", person2.species); // 原型属性

console.log("\n=== 总结 ===");
console.log("1. 每个函数都有prototype属性，指向原型对象");
console.log("2. 每个实例都有__proto__属性，指向构造函数的prototype");
console.log("3. 原型链是通过__proto__连接形成的链式结构");
console.log("4. 属性查找从实例开始，沿着原型链向上查找");
console.log("5. 原型链的顶端是Object.prototype，再向上是null"); 