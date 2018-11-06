import './css/index.css';  //导入css
import './css/font.scss';  //导入scss

import React from 'react';
import {render} from 'react-dom';
import Hello from './hello'; // 可省略.js后缀名

render(<Hello />, document.getElementById('root'));
