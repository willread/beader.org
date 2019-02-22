import React, { Component } from 'react';

import { apiPath } from '../config';
import { UserContext } from '../App';

const images = {
  alignPixel: require('../images/align-pixel.png'),
  alignNormal: require('../images/align-normal.png'),
  alignHorizontal: require('../images/align-horizontal.png'),
  alignVertical: require('../images/align-vertical.png'),
  brush: require('../images/brush.png'),
  fill: require('../images/fill.png'),
  picker: require('../images/picker.png'),
}

class Designer extends Component {
  myRefs = {};
  clearColor = 'ffffff';
  colors = ['000000', '412000', '451904', '5d1f0c', '4a1700', '490036', '48036c', '051e81', '0b0779', '1d295a', '004b59', '004800', '164000', '2c3500', '463a09', '401a02', '252525', '542800', '721e11', '7a240d', '721f00', '66004b', '5c0488', '0626a5', '201c8e', '1d3876', '005d6e', '005400', '1c5300', '384400', '4d3f09', '581f05', '343434', '763700', '9f241e', '982c0e', 'a81300', '80035f', '650d90', '082fca', '3531a3', '1d4892', '006f84', '036b03', '236600', '445200', '544509', '702408', '4e4e4e', '9a5000', 'b33a20', 'b02f0f', 'c8210a', '950f74', '7b23a7', '263dd4', '4642b4', '1d5cac', '00849c', '0e760e', '287800', '495600', '6c5809', '8d3a13', '686868', 'c36806', 'c85120', 'bf3624', 'df2512', 'aa2288', '933bbf', '444cde', '5753c5', '1d71c6', '0099bf', '188018', '2e8c00', '607100', '907609', 'ab511f', '757575', 'e47b07', 'e36920', 'd34e2a', 'ec3b24', 'ba3d99', '9d45c9', '4f5aec', '615dcf', '3286cf', '00abca', '279227', '3a980c', '6c7f00', 'ab8b0a', 'b56427', '8e8e8e', 'ff911a', 'fc8120', 'e7623e', 'fa5236', 'ca4da9', 'a74fd3', '5a68ff', '6d69db', '489bd9', '00bcde', '36a436', '47a519', '798d0a', 'c1a120', 'bf7730', 'a4a4a4', 'ffab1d', 'fd8c25', 'f36e4a', 'fc6148', 'd75ab6', 'b25ade', '6575ff', '7b77e9', '4ea8ec', '00d0f5', '4eb94e', '51af23', '8b9f1c', 'd0b02f', 'd0853a', 'b8b8b8', 'ffc51f', 'fe982c', 'fd7854', 'ff705f', 'e467c3', 'bd65e9', '7183ff', '8985f7', '55b6ff', '10dcff', '51cd51', '5cba2e', '9eb22f', 'debe3d', 'e19344', 'c5c5c5', 'ffd03b', 'ffae38', 'ff8a6a', 'ff7e7e', 'ef72ce', 'c56df1', '8091ff', '918dff', '69caff', '3ee1ff', '72da72', '71cf43', 'abbf3c', 'e6c645', 'eda04e', 'd0d0d0', 'ffd84c', 'ffb946', 'ff987c', 'ff8f8f', 'fb7eda', 'ce76fa', '90a0ff', '9c98ff', '74cbff', '64e7ff', '7ce47c', '85e357', 'b8cc49', 'edcd4c', 'f9ad58', 'd7d7d7', 'ffe651', 'ffbf51', 'ffa48b', 'ff9d9e', 'ff8de1', 'd583ff', '97a9ff', 'a7a4ff', '82d3ff', '76eaff', '85ed85', '8deb5f', 'c2d653', 'f5d862', 'fcb75c', 'e1e1e1', 'fff456', 'ffc66d', 'ffb39e', 'ffabad', 'ff9de5', 'da90ff', '9fb2ff', 'b2afff', '8ddaff', '8bedff', '99f299', '97f569', 'cde153', 'fbe276', 'ffc160', 'eaeaea', 'fff970', 'ffd587', 'ffc2b2', 'ffb9bd', 'ffa5e7', 'de9cff', 'afbeff', 'bbb8ff', '9fd4ff', '9aefff', 'b3f7b3', 'a0fe72', 'dbef6c', 'fcee98', 'ffca69', 'f4f4f4', 'ffff90', 'ffe498', 'ffd0c3', 'ffc7ce', 'ffafea', 'e2a9ff', 'c0cbff', 'c3c1ff', 'b4e2ff', 'b1f3ff', 'c3f9c3', 'b1ff8a', 'e8fc79', 'fdf3a9', 'ffcf7e', 'ffffff', 'ffffaa', 'ffe6ab', 'ffdad0', 'ffcade', 'ffb8ec', 'e6b6ff', 'cdd3ff', 'd3d1ff', 'c0ebff', 'c7f6ff', 'cdfccd', 'bcff9a', 'f2ffab', 'fdf3be', 'ffda96'];
  hidePaletteTimeout = null;
  canvasWidth = 700;
  canvasHeight = 700;
  previewWidth = 150;
  previewHeight = 150;
  paletteWidth = 400;
  paletteHeight = 300;
  paletteCols = 16;
  paletteRows = 16;

  state = {
    width: 10,
    height: 10,
    previousWidth: 10,
    previousHeight: 10,
    name: 'Untitled Pattern',
    align: 'normal',
    mode: 'brush',
    color: '000000',
    drawing: false,
    pattern: (new Array(100)).fill('ffffff'),
    saving: false,
    oldColor: '000000',
    showPalette: false,
  };

  constructor(props) {
    super(props);

    console.log('props', props);
    console.log('context', this.context);

    this.myRefs = {
      palette: React.createRef(),
      paletteWrapper: React.createRef(),
      color: React.createRef(),
      saveButton: React.createRef(),
      preview: React.createRef(),
      grid: React.createRef(),
    };
  }

  initPattern() {
    let newPattern = [];

    // Clear pattern to new size

    for(let ii = 0; ii < this.state.width * this.state.height; ii++){
      newPattern.push(this.clearColor);
    }

    // Copy previous pattern

    for(let ii = 0; ii < this.state.previousWidth; ii++){
      if(ii >= this.state.width) break;
      for(let jj = 0; jj < this.state.previousHeight; jj++){
        if(jj >= this.state.height) break;
        newPattern[ii + jj * this.state.width] = this.state.pattern[ii + jj * this.state.previousWidth];
      }
    }

    this.setState({
      pattern: newPattern,
      previewWidth: this.state.width,
      previousHeight: this.state.height
    });
  }

  componentDidMount() {
    this.initPattern();
    // this.renderGrid();
    this.renderPalette();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderPalette() {
    let palette = this.myRefs.palette.current;
    let context = palette.getContext('2d');

    let width = (this.paletteWidth - 1) / this.paletteCols - 1;
    let height = (this.paletteHeight - 1) / this.paletteRows - 1;

    for (let y = 0; y < this.paletteRows; y++) {
      for (let x = 0; x < this.paletteCols; x++) {
        context.beginPath();
        context.fillStyle = '#' + this.colors[y * this.paletteCols + x];
        context.fillRect(x * (width + 1), y * (height + 1), width, height);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 1;
        context.stroke();
      }
    }

    this.hidePalette();
  }

  showPalette() {
    this.setState({oldColor: this.state.color, showPalette: true});
    clearTimeout(this.hidePaletteTimeout);
  }

  hidePalette(delay = 0) {
    this.hidePaletteTimeout = setTimeout(() => {
      this.setState({showPalette: false});
    }, delay);
  }

  getOffset(el) {
    const box = el.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
}

  resetColor() {
    this.setState({color: this.state.oldColor});
  }

  selectColor(e, hide = false) {
    const palette = this.myRefs.palette.current;
    const width = this.paletteWidth / this.paletteCols;
    const height = this.paletteHeight / this.paletteRows;
    const offset = this.getOffset(palette);
    const offsetX = e.pageX - offset.left;
    const offsetY = e.pageY - offset.top;
    const x = Math.floor(offsetX / width);
    const y = Math.floor(offsetY / height);

    this.setState({color: this.colors[y * this.paletteCols + x]});

    if(hide){
      this.hidePalette();
      this.setState({oldColor: this.state.color});
    }
  }

  setMode(mode) {
    this.setState({mode});
  }

  setAlign(align) {
    this.setState({align});
    // this.renderGrid();
  }

  startDrawing() {
    this.setState({drawing: true});
  }

  stopDrawing() {
    this.setState({drawing: false});
  }

  drag(e) {
    if (this.state.drawing && this.state.mode === 'brush') {
      this.draw(...this.getXY(e));
    }
  }

  getXY(e) {
    e = e.nativeEvent;
    let size = this.state.width > this.state.height ? this.canvasWidth / this.state.width : this.canvasHeight / this.state.height;

    if (this.state.align !== 'normal' && this.state.align !== 'pixel') {
      size = this.state.width > this.state.height ? size - size / this.state.width / 2 : size - size / this.state.height / 2;
    }

    let x, y;
    let centeringOffset = (this.canvasWidth - size * this.state.width) / 2;

    if(this.state.align === 'horizontal'){
      y = Math.floor(e.offsetY / size);
      let horizontalOffset = !(y % 2) ? size / 2 : 0;
      centeringOffset -= size / 4;
      x = Math.floor((e.offsetX - centeringOffset - horizontalOffset) / size);
    }

    if(this.state.align === 'vertical'){
      x = Math.floor((e.offsetX - centeringOffset) / size);
      let verticalOffset = (x % 2) ? size / 2 : 0;
      y = Math.floor((e.offsetY - verticalOffset) / size);
    }

    if(this.state.align === 'normal' || this.state.align === 'pixel'){
      x = Math.floor((e.offsetX - centeringOffset) / size);
      y = Math.floor(e.offsetY / size);
    }

    return [x, y];
  }

  click(e) {
    if (this.state.mode === 'brush') {
      const xy = this.getXY(e);

      this.stopDrawing(e);
      this.draw(...xy);
    }

    if (this.state.mode === 'fill') {
      this.fill(...this.getXY(e));
    }
  }

  getPatternCell(x, y) {
    return this.state.pattern[x + y * this.state.width];
  }

  setPatternCell(x, y, color) {
    const pattern = this.state.pattern;
    pattern[x + y * this.state.width] = color;
    this.setState({pattern});
  }

  draw(x, y) {
    this.setPatternCell(x, y, this.state.color);
    // this.renderGrid();
  }

  fill(x, y) {
    const oldColor = this.getPatternCell(x, y) || this.clearColor;
    if (oldColor === this.state.color) return;

    let stack = [
      [x, y]
    ];

    while (stack.length) {
      const cell = stack.pop();
      const x = cell[0];
      const y = cell[1];

      this.setPatternCell(x, y, this.state.color);

      if (x - 1 >= 0 && oldColor === (this.getPatternCell(x - 1, y) || 'ffffff'))
        stack.push([x - 1, y]);

      if (x + 1 < this.state.width && oldColor === (this.getPatternCell(x + 1, y) || 'ffffff'))
        stack.push([x + 1, y]);

      if (y - 1 >= 0 && oldColor === (this.getPatternCell(x, y - 1) || 'ffffff'))
        stack.push([x, y - 1]);

      if (y + 1 < this.state.height && oldColor === (this.getPatternCell(x, y + 1) || 'ffffff'))
        stack.push([x, y + 1]);
    }

    // this.renderGrid();
  }

  renderGrid() {
    const canvas = this.myRefs.grid.current;
    const context = canvas.getContext('2d');

    let size = this.state.width > this.state.height ? this.canvasWidth / this.state.width : this.canvasHeight / this.state.height;

    if (this.state.align !== 'normal' && this.state.align !== 'pixel') {
      size = this.state.width > this.state.height ? size - size / this.state.width / 2 : size - size / this.state.height / 2;
    }

    const horizontalOffset = this.state.align === 'horizontal' ? size / 2: 0;
    const verticalOffset = this.state.align === 'vertical' ? size / 2 : 0;
    const centeringOffset = (this.canvasWidth - size * this.state.width - horizontalOffset) / 2;

    canvas.setAttribute('width', canvas.getAttribute('width')); // Clear canvas

    for (let x = 0; x < this.state.width; x++) {
      for (let y = 0; y < this.state.height; y++) {
        context.beginPath();

        if(this.state.align === 'pixel'){
          context.rect(x * size + centeringOffset, y * size, size, size);
        }else{
          context.arc(x * size + size / 2 + (!(y % 2) ? horizontalOffset : 0) + centeringOffset, y * size + size / 2 + (x % 2 ? verticalOffset : 0), size / 2 - 1, 0, 2 * Math.PI, false);
        }

        context.fillStyle = '#' + (this.getPatternCell(x, y) || this.clearColor);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }

    // Generate preview
    // NOTE: Because the browser doesn't provide proper antialiasing,
    // we use a small hack to draw the image at increasingly small sizes
    // to smooth out the final image

    const preview = this.myRefs.preview.current;
    const previewContext = preview.getContext('2d');
    const step1 = document.createElement('canvas');
    const step1Context = step1.getContext('2d');

    step1.width = this.canvasWidth / 2;
    step1.height = this.canvasHeight / 2;

    step1Context.clearRect(0, 0, step1.width, step1.height);
    step1Context.drawImage(context.canvas, 0, 0, this.canvasWidth, this.canvasHeight, 0, 0, step1.width, step1.height);

    previewContext.clearRect(0, 0, this.previewWidth, this.previewHeight);
    previewContext.drawImage(step1, 0, 0, step1.width, step1.height, 0, 0, this.previewWidth, this.previewHeight);
  }

  save() {
    this.setState({saving: true});

    if(!this.state.pattern.find(cell => {
      return cell !== this.pattern[0];
    })){
      this.setState({saving: false});
      return alert('Pattern must have more than one color!');
    }

    fetch(`${apiPath}/patterns`, {
      method: 'post',
      body: {
        name: this.state.name,
        description: '',
        width: this.state.width,
        height: this.state.height,
        align: this.state.align,
        pattern: this.state.pattern,
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({saving: false});
      // TODO: Navigate to pattern route (/patterns/${response._id})
    })
    .catch(error => {
      alert('Error: ' + error);
      this.setState({saving: false});
    });
  }

  render() {
    const {color, align,  width, height, name, saving, mode} = this.state;
    const {paletteWidth, paletteHeight} = this;

    return (
      <UserContext.Consumer>{user =>
        <div id='editor' ref={this.myRefs.editor}>
          <div className='tools'>
              <div className='button-group'>
                <button className={align === 'pixel' ? 'active' : ''} onClick={() => this.setAlign('pixel')} id='align-pixel'>
                  <img src={images.alignPixel} width='30' height='30' alt='Align Pixel' />
                </button>
                <button className={align === 'normal' ? 'active' : ''} onClick={() => this.setAlign('normal')} id='align-normal'>
                  <img src={images.alignNormal} width='30' height='30' alt='Align Normal' />
                </button>
                <button className={align === 'horizontal' ? 'active' : ''} onClick={() => this.setAlign('horizontal')} id='align-horizontal'>
                  <img src={images.alignHorizontal} width='30' height='30' alt='Align Horizontal' />
                </button>
                <button className={align === 'vertical' ? 'active' : ''} onClick={() => this.setAlign('vertical')} id='align-vertical'>
                  <img src={images.alignVertical} width='30' height='30' alt='Align Vertical' />
                </button>
              </div>

              <div className='button-group'>
                <button className={mode === 'brush' ? 'active' : ''} onClick={() => this.setMode('brush')} id='mode-brush'>
                  <img src={images.brush} width='30' height='30' alt='Brush Tool' />
                </button>
                <button className={mode === 'fill' ? 'active' : ''} onClick={() => this.setMode('fill')} id='mode-fill'>
                  <img src={images.fill} width='30' height='30' alt='Fill Tool' />
                </button>
              </div>

              <div className='button-group show-overflow color-wrapper' onMouseOver={() => this.showPalette()} onMouseLeave={() => this.hidePalette(400)}>
                <button id='color' style={{backgroundColor: `#${color}`}} ref={this.myRefs.color}>
                  <img src={images.picker} width='30' height='30' alt='Picker Tool' />
                </button>

                <div id='palette-wrapper' className={this.state.showPalette ? 'show' : ''}>
                  <canvas
                    onClick={e => this.selectColor(e, true)}
                    onMouseMove={e => this.selectColor(e)}
                    onMouseDown={e => this.selectColor(e, true)}
                    onMouseLeave={() => this.resetColor()}
                    id='palette'
                    ref={this.myRefs.palette}
                    width={paletteWidth}
                    height={paletteHeight}
                  ></canvas>
                </div>
              </div>

              <div className='right'>
                <div className='select'>
                  <select value={width} onChange={e => this.setState({width: e.target.value})}>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                  </select>
                </div>

                <div className='label'>x</div>

                <div className='select'>
                  <select value={height} onChange={e => this.setState({height: e.target.value})}>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                  </select>
                </div>

                <input value={name} onChange={e => this.setState({name: e.target.value})} type='text' placeholder='Pattern Name' />
                {!user && <button disabled className='save-button'>Sign In To Save</button>}
                {user &&
                  <button onClick={() => this.save()} disabled={saving} className='save-button'>
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                }
              </div>
          </div>

          <div className='grid-wrapper'>
            <canvas
              onMouseMove={e => this.drag(e)}
              onClick={e => this.click(e)}
              onMouseDown={e => this.startDrawing(e)}
              onMouseLeave={e => this.stopDrawing(e)}
              id='grid'
              ref={this.myRefs.grid}
              width={this.canvasWidth}
              height={this.canvasHeight}
            ></canvas>

            <canvas
              id='preview'
              ref={this.myRefs.preview}
              width={this.previewWidth}
              height={this.previewHeight}
            ></canvas>
          </div>
        </div>
      }</UserContext.Consumer>
    );
  }
}

export default Designer;
