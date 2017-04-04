# TwoWayBinder

## 使用方式
- 表單element，例如：`<input>`、`<textarea>`
- 顯示用element(optional)，例如：`<div>`、`<p>`
- 資料來源，例如：`dataObj = { value: 123456789, data: 'apple' , 'data-order': 0};`


## 範例

```html
<input class="input" value="hello, world!" data="this is data!" data-foo="bar" />
<div class="output"></div>

<input class="input-1" value="hello, world!" data="this is data!" data-foo="bar" />
<div class="output-1"></div>
```

```javascript
var dataObj = { value: 123456789, data: 'apple' , 'data-foo': 'foo'};
var inputNode= document.getElementsByClassName('input');
var textNode = document.getElementsByClassName('output');
var binder = new TwoWayBinder(dataObj, inputNode, textNode);

binder.data.value = 999999999;

binder.addInputNodes(document.getElementsByClassName('input-1')); //add additional input nodes
binder.addTextNodes(document.getElementsByClassName('output-1')); //add additional text nodes

```