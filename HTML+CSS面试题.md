# HTML + CSS +JS

## HTML的语义化

HTML语义化指的是在创建html页面时，避免使用大篇幅的无语义的标签，采用语义清晰的html标签比如Header Footer Main Nav Section  等结构标签，例如标题可以通过h1实现，也可以通过span + css实现，使用语义化标签的好处是易于用户阅读，页面样式未加载时结构清晰，有利于SEO，搜索引擎利用关键字和上下文确定权重，并且由于强语义的作用，代码更好维护，可读性高， 方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。 但是目前仍有一部分主流网页没有采用语义化标签，而是使用div+id：header等格式，可能是认为网站工作量大，语义化作用没有那么大，因此认为语义化标签重构没有必要

## Css盒子模型

CSS盒子模型本质上就是一个盒子，盒子模型定义了盒子中的每个部分，包括Content,padding,Broder,Margin 四个部分 盒子模型分为标准盒模（box-sizing：content-box）和怪异盒（ box-sizing：border-box ）模型，标准盒子模型在给出盒子的width和height的时候，其实设置的是Content box的宽高，加上padding 和 broder才是真实盒子的宽高 设置怪异盒子模型，给设置的width和height是content + padding + border的总和，width和height就控制着盒子的实际大小

## 浮动的作用

浮动的元素会脱离标准流，最初是给图片添加浮动，实现文字环绕图片的效果，浮动可以实现模式转化，转为行内块元素，即添加了浮动的块级元素可以出现在同一行，可以实现导航条等效果，如果对子盒子设置了浮动，父盒没有高度，被撑开就会导致塌陷，影响布局，清除浮动常见的有三种做法，第一种是给父元素添加伪元素，第二种是给浮动的父级添加overflow：hidden ，第三种是给浮动的父级添加标签并带上样式 clear：both。

## CSS选择器优先级

首先优先级较高的规则会覆盖优先级较低的规则，而如果如果两个规则的优先级相同，那么后定义的规则会覆盖先定义的规则，选择器的优先级是!important > id选择器 > 类选择器 /伪类选择器/属性选择器 > 标签选择器/伪元素选择器>通配符选择器，并且根据该规则对应选择器的个数填入（a,b,c,d），比较优先级，从高位到低位

 !important  内联样式 

 ID 选择器（#id{}）

  类选择器（.class{}） = 属性选择器（a[href="segmentfault.com"]{}） = 伪类选择器（ :hover{}）

  标签选择器（span{}） = 伪元素选择器（ ::before{}）= 后代选择器（.father .child{}）

 子选择器（.father > .child{}） = 相邻选择器（ .bro1 + .bro2{}）  

通配符选择器（*{}）  



## CSS尺寸设置的单位

px绝对单位 表示像素，可以实现开发网页的精确布局

em 相对长度单位，在 `font-size` 中相对于父元素的字体大小（由于继承了父类的字体大小，其实还是相对自己的大小），在其他属性中相对于自身的字体大小 

rem 相对于html根元素的字体大小

vw 相对视窗宽度的单位 1vw = 0.01视窗宽度

vh 相对视窗的高度单位 1vh = 0.01视窗高度

## CSS元素水平垂直居中的方法

1.利用定位 子绝父相，left:50%,top:50%然后让子元素通过translate平移x和y轴自身一半的距离，实现居中

2.display：flex 设置布局，随后justify-content 实现水平居中 align-items实现垂直居中，适配ie11以上

3.display：grid设置布局，随后justify-content 实现水平居中 align-items实现垂直居中，适配ie10以上

4.设置display：table-cell 转化为表单元素，利用text-align:center 和  vertical-align: middle;` 并设置子元素为inline-block实现居中，兼容性好

## CSS中实现三栏布局的方法

1.圣杯布局，利用float 和marign-left负值 + padding结合 相对定位实现，当浏览器窗口过小布局会乱掉，好处是先加载main

2.双飞翼布局，利用float 和marign-left负值 + margin结合 相对定位实现，当浏览器窗口过小布局会乱掉，好处是先加载main

2.flex布局，利用flex：1实现

3.grid布局，利用grid划分200px 1fr 200px 实现三栏布局

4.绝对定位实现，利用子绝父相，container设置relative ，left right 分别定位左上 右上实现

## 什么是BFC

 BFC是**块级格式化上下文**（Block Formatting Context）的缩写，它是一个独立的渲染区域，决定了元素如何对其内容进行定位，以及与其它元素的相互作用。简单来说，BFC是一个封闭的盒子，其内部的子元素不会影响到外部的元素，设置bfc会让元素垂直排列 设置方法：overflow：hidden , float不为none  position: absolute/fixed  display:inline-block/table-cell/flex; 作用：解决父元素因为浮动而导致的高度塌陷问题， 解决外边距重合的问题

 【什么情况下可以让元素产生BFC】 1、float属性不为none 2、position为absolute或fixed 3、display为inline-block、table-cell、table-caption、flex、inline-flex 4、overflow不为visible 【BFC元素具有的特性】 1、在BFC中，盒子从顶部开始垂直地一个接一个排列 2、盒子垂直方向的距离由margin决定。同一个BFC的两个相邻盒子margin会重叠 3、BFC中，margin-left会触碰到border-left（对于从左至右的方式，反之） 4、BFC区域不会与浮动的盒子产生交集，而是紧贴边缘浮动 5、计算BFC高度时，自然会检测浮动的盒子高度 【主要用途】 1、清除内部浮动，父元素设置为BFC可以清除子元素的浮动（最常用overflow:hidden，IE6需加上*zoom:1）：计算BFC高度时会检测浮动子盒子高度 2、解决外边距合并问题 3、右侧盒子自适应：BFC区域不会与浮动盒子产生交集，而是紧贴浮动边缘





回答： BFC(Block Formatting Context)块级格式化上下文，是Web页面一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素。  BFC布局规则 -内部盒子会在垂直方向，一个接一个地放置。 -Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。 -每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。 -BFC的区域不会与float box重叠。 -BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。 -计算BFC的高度时，浮动元素也参与计算。  BFC形成的条件 -`float `设置成 `left `或 `right` -`position `是`absolute`或者`fixed` -`overflow `不是`visible`，为 `auto`、`scroll`、`hidden` -`display`是`flex`或者`inline-block` 等 BFC解决能的问题：清除浮动  加分回答 BFC的方式都能清除浮动，但是常使用的清除浮动的BFC方式只有`overflow:hidden`,原因是使用float或者position方式清除浮动，虽然父级盒子内部浮动被清除了，但是父级本身又脱离文档流了，会对父级后面的兄弟盒子的布局造成影响。如果设置父级为`display:flex`，内部的浮动就会失效。所以通常只是用`overflow: hidden`清除浮动 

## flex1是什么

`flex: 1` 是以下三个属性的复合属性：

1. **`flex-grow`**
   - **含义**：定义项目的放大比例，控制剩余空间的分配。
   - **默认值**：`0`（不放大）。
   - **作用**：当容器有剩余空间时，按 `flex-grow` 值的比例分配给各项目。例如，`flex-grow: 1` 表示项目会放大并占据剩余空间。
2. **`flex-shrink`**
   - **含义**：定义项目的缩小比例，控制空间不足时的收缩行为。
   - **默认值**：`1`（允许缩小）。
   - **作用**：当容器空间不足时，项目按 `flex-shrink` 值的比例缩小（值越大收缩越多，`0` 表示不收缩）。
3. **`flex-basis`**
   - **含义**：定义项目在分配多余空间前的初始大小。
   - **默认值**：`auto`（基于内容或明确设置的尺寸）。
   - **作用**：设置项目的基准大小（如 `100px` 或 `20%`），剩余空间按 `flex-grow`/`flex-shrink` 分配。

flex-grow: 1;
flex-shrink: 1;  /* 默认值 */
flex-basis: 0%;  /* 默认值 */

- **效果**：项目初始大小为 `0%`，剩余空间按 `flex-grow: 1` 全部分配给该项目，空间不足时按 `flex-shrink: 1` 等比例收缩。

## Css类与伪类的区别

 CSS 类是用户自定义的**选择器**，通过为 HTML 元素添加 `class` 属性，实现**样式复用**和**分组管理**。 

 类是 CSS 预定义的**动态选择器**，用于匹配元素的**特定状态**或**文档结构中的位置**。 分为状态伪类与结构伪类，状态伪类包括:hover :checked :focus等，结构伪类包括:first-child :nth-child() :last-child等等，结构伪类无需用户对html结构修改，浏览器直接分析提供这些功能，为用户的某些交互操作提供样式

类**：需手动为元素添加 `class` 属性，属于**静态选择**。**伪类**：由 CSS 自动匹配条件（如状态、位置），属于**动态选择**。**

**应用对象**：

类**：作用于元素的**整体样式**（如 `.error` 定义错误提示框）。**

伪类**：作用于元素的**特定状态或局部（如 `a:hover` 定义链接悬停效果）。

作用机制：

- **类**：依赖 HTML 结构的显式标记。
- **伪类**：依赖浏览器对元素状态或结构的隐式计算。

类与伪类配合使用，用来限制某个具体元素在某些情况下的显示样式

## CSS伪类与伪元素的区别

CSS 中伪类（Pseudo-class）和伪元素（Pseudo-element）的核心区别在于**作用目标**和**语法标识**。

- **伪类**以单冒号 `:` 开头（如 `:hover`、`:nth-child`），用于选择**整个元素在特定状态或结构中的表现**，例如响应交互（悬停、焦点）或筛选文档中的元素位置（首个子元素）。
- **伪元素**以双冒号 `::` 开头（如 `::before`、`::first-line`），用于操作**元素的局部内容**或**插入虚拟元素**，例如在元素前后添加装饰性内容、控制首行文本样式。
- **关键区别**：伪类基于元素状态动态修改样式，不生成新元素；而伪元素可创建独立渲染的虚拟节点（如 `::before`），需配合 `content` 属性使用。实际开发中，二者常结合使用，例如通过 `.btn:hover::after` 实现悬停时动态图标效果。

 ，伪类和伪元素的核心区别在于其作用对象和功能：伪类（如:hover、:nth-child）通过单冒号语法（:）描述元素的特定状态或结构关系，作用于已存在的元素本身，用于动态响应交互或匹配DOM树中的特定条件；而伪元素（如::before、::after）通过双冒号语法（::）在元素内部创建虚拟的抽象节点（不会出现在DOM中），用于向选定元素添加样式化内容或修饰特定内容区块，本质上是对元素内容层的扩展和样式增强， 

 ## css手写实现三角形

伪元素法 + 边框实现三角形
 ```javascript
  <div class="triangle-container"></div>
    <style>
        .triangle-container {
            position: relative;
            width: 100px;
            height: 100px;
        }

        .triangle-container::before {
            content: '';
            position: absolute;
            
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid #007bff;
        }
    </style>
 ```
边框实现三角形
```javascript
<body>
    <div class="sanjiao"></div>
    <style>
        .sanjiao{
            width: 0;
            height: 0;
            border-bottom: 100px solid yellow;
            border-top:100px solid transparent; ;
            border-right: 100px solid transparent;
            border-left: 100px solid transparent;
        }
    </style>
</body>
```

## inline-block的空隙原因

渲染了空白字符作为空格导致元素之间出现了间隙
1.将父元素的font-size 变为0，利用空白字符也算字体的特性
2.去除多个inline-block元素的标签之间的空行，紧凑去除


## html中的meta标签对seo有什么帮助
<meta> 标签在 HTML 中对 SEO 的主要帮助有以下几点：
字符集声明 ：<meta charset="UTF-8"> 确保网页内容正确显示，避免乱码，使搜索引擎能准确抓取和理解文本内容。
视口设置 ：<meta name="viewport" content="width=device-width, initial-scale=1.0"> 保证网页在移动设备上良好显示，提升移动端用户体验，间接有利于 SEO。
网页描述 ：<meta name="description" content="网页描述内容"> 为网页提供简介，虽不直接影响排名，但吸引用户点击，提高点击率，间接助力 SEO。
关键词（可选） ：<meta name="keywords" content="关键词列表"> 曾对 SEO 重要，现虽作用减弱，但合理设置仍可辅助搜索引擎理解网页主题。