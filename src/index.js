import './css/index.css';  //导入css
import './css/font.scss';  //导入scss

const hello = require('./hello.js');
document.querySelector("#root").appendChild(hello());