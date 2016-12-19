import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {App} from './app';

@inject(HttpClient, Router, AuthService, App)
export class Designer {
  constructor(http, router, auth, app) {
    this.http = http;
    this.router = router;
    this.auth = auth;
    this.app = app;
  }

  // Palette colors

  colors = ['000000', '412000', '451904', '5d1f0c', '4a1700', '490036', '48036c', '051e81', '0b0779', '1d295a', '004b59', '004800', '164000', '2c3500', '463a09', '401a02', '252525', '542800', '721e11', '7a240d', '721f00', '66004b', '5c0488', '0626a5', '201c8e', '1d3876', '005d6e', '005400', '1c5300', '384400', '4d3f09', '581f05', '343434', '763700', '9f241e', '982c0e', 'a81300', '80035f', '650d90', '082fca', '3531a3', '1d4892', '006f84', '036b03', '236600', '445200', '544509', '702408', '4e4e4e', '9a5000', 'b33a20', 'b02f0f', 'c8210a', '950f74', '7b23a7', '263dd4', '4642b4', '1d5cac', '00849c', '0e760e', '287800', '495600', '6c5809', '8d3a13', '686868', 'c36806', 'c85120', 'bf3624', 'df2512', 'aa2288', '933bbf', '444cde', '5753c5', '1d71c6', '0099bf', '188018', '2e8c00', '607100', '907609', 'ab511f', '757575', 'e47b07', 'e36920', 'd34e2a', 'ec3b24', 'ba3d99', '9d45c9', '4f5aec', '615dcf', '3286cf', '00abca', '279227', '3a980c', '6c7f00', 'ab8b0a', 'b56427', '8e8e8e', 'ff911a', 'fc8120', 'e7623e', 'fa5236', 'ca4da9', 'a74fd3', '5a68ff', '6d69db', '489bd9', '00bcde', '36a436', '47a519', '798d0a', 'c1a120', 'bf7730', 'a4a4a4', 'ffab1d', 'fd8c25', 'f36e4a', 'fc6148', 'd75ab6', 'b25ade', '6575ff', '7b77e9', '4ea8ec', '00d0f5', '4eb94e', '51af23', '8b9f1c', 'd0b02f', 'd0853a', 'b8b8b8', 'ffc51f', 'fe982c', 'fd7854', 'ff705f', 'e467c3', 'bd65e9', '7183ff', '8985f7', '55b6ff', '10dcff', '51cd51', '5cba2e', '9eb22f', 'debe3d', 'e19344', 'c5c5c5', 'ffd03b', 'ffae38', 'ff8a6a', 'ff7e7e', 'ef72ce', 'c56df1', '8091ff', '918dff', '69caff', '3ee1ff', '72da72', '71cf43', 'abbf3c', 'e6c645', 'eda04e', 'd0d0d0', 'ffd84c', 'ffb946', 'ff987c', 'ff8f8f', 'fb7eda', 'ce76fa', '90a0ff', '9c98ff', '74cbff', '64e7ff', '7ce47c', '85e357', 'b8cc49', 'edcd4c', 'f9ad58', 'd7d7d7', 'ffe651', 'ffbf51', 'ffa48b', 'ff9d9e', 'ff8de1', 'd583ff', '97a9ff', 'a7a4ff', '82d3ff', '76eaff', '85ed85', '8deb5f', 'c2d653', 'f5d862', 'fcb75c', 'e1e1e1', 'fff456', 'ffc66d', 'ffb39e', 'ffabad', 'ff9de5', 'da90ff', '9fb2ff', 'b2afff', '8ddaff', '8bedff', '99f299', '97f569', 'cde153', 'fbe276', 'ffc160', 'eaeaea', 'fff970', 'ffd587', 'ffc2b2', 'ffb9bd', 'ffa5e7', 'de9cff', 'afbeff', 'bbb8ff', '9fd4ff', '9aefff', 'b3f7b3', 'a0fe72', 'dbef6c', 'fcee98', 'ffca69', 'f4f4f4', 'ffff90', 'ffe498', 'ffd0c3', 'ffc7ce', 'ffafea', 'e2a9ff', 'c0cbff', 'c3c1ff', 'b4e2ff', 'b1f3ff', 'c3f9c3', 'b1ff8a', 'e8fc79', 'fdf3a9', 'ffcf7e', 'ffffff', 'ffffaa', 'ffe6ab', 'ffdad0', 'ffcade', 'ffb8ec', 'e6b6ff', 'cdd3ff', 'd3d1ff', 'c0ebff', 'c7f6ff', 'cdfccd', 'bcff9a', 'f2ffab', 'fdf3be', 'ffda96'];

  // Defaults

  width = 10
  height = 10
  canvasWidth = 700
  canvasHeight = 700
  paletteWidth = 400
  paletteHeight = 300
  paletteCols = 16
  paletteRows = 16
  previousWidth = 10
  previousHeight = 10
  name = 'Untitled Pattern'
  align = 'normal'
  mode = 'brush'
  color = '000000'
  clearColor = 'ffffff'
  drawing = false
  pattern = []
  saving = false

  initPattern() {
    let newPattern = [];

    // Clear pattern to new size

    for(let ii = 0; ii < this.width * this.height; ii++){
      newPattern.push(this.clearColor);
    }

    // Copy previous pattern

    for(let ii = 0; ii < this.previousWidth; ii++){
      if(ii >= this.width) break;
      for(let jj = 0; jj < this.previousHeight; jj++){
        if(jj >= this.height) break;
        newPattern[ii + jj * this.width] = this.pattern[ii + jj * this.previousWidth];
      }
    }

    this.pattern = newPattern;
    this.previousWidth = this.width;
    this.previousHeight = this.height;
  }

  changePatternSize() {
    this.initPattern();
    this.renderGrid();
  }

  attached() {
    $('#color').css('backgroundColor', '#' + this.color);

    this.initPattern();
    this.renderGrid();
    this.renderPalette();
  }

  // Render the palette canvas

  renderPalette() {
    let palette = $('#palette')[0];
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

    $('#palette-wrapper').addClass('hidden');
  }

  selectColor($event) {
    let palette = $('#palette')[0];
    let context = palette.getContext('2d');

    let width = Math.floor(this.paletteWidth / this.paletteCols);
    let height = Math.floor(this.paletteHeight / this.paletteRows);

    let offsetX = $event.pageX - $(palette).offset().left;
    let offsetY = $event.pageY - $(palette).offset().top;

    let x = Math.floor(offsetX / width);
    let y = Math.floor(offsetY / height);

    this.color = this.colors[y * this.paletteCols + x];

    $('#color').css('backgroundColor', '#' + this.color);
  }

  setMode(mode) {
    this.mode = mode;
  }

  setAlign(align) {
    this.align = align;
    this.renderGrid();
  }

  startDrawing() {
    this.drawing = true;
  }

  stopDrawing() {
    this.drawing = false;
  }

  drag($event) {
    if (this.drawing && this.mode == 'brush') {
      this.draw(...this.getXY($event));
    }
  }

  getXY($event) {
    let canvas = $('#grid')[0];
    let size = this.width > this.height ? this.canvasWidth / this.width : this.canvasHeight / this.height;

    if (this.align !== 'normal') {
      size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
    }

    let x, y;
    let centeringOffset = (this.canvasWidth - size * this.width) / 2;

    if(this.align == 'horizontal'){
      y = Math.floor($event.offsetY / size);
      let horizontalOffset = !(y % 2) ? size / 2 : 0;  
      centeringOffset -= size / 4;
      x = Math.floor(($event.offsetX - centeringOffset - horizontalOffset) / size);
      console.log(y, horizontalOffset, centeringOffset, x);
    }

    if(this.align == 'vertical'){
      x = Math.floor(($event.offsetX - centeringOffset) / size);
      let verticalOffset = (x % 2) ? size / 2 : 0;  
      y = Math.floor(($event.offsetY - verticalOffset) / size);
    }

    if(this.align == 'normal'){
      x = Math.floor(($event.offsetX - centeringOffset) / size);
      y = Math.floor($event.offsetY / size);
    }

    return [x, y];
  }

  click($event) {
    if (this.mode == 'brush') {
      this.stopDrawing($event);
      this.draw(...this.getXY($event));
    }

    if (this.mode == 'fill') {
      this.fill(...this.getXY($event));
    }
  }

  getPatternCell(x, y) {
    return this.pattern[x + y * this.width];
  }

  setPatternCell(x, y, color) {
    this.pattern[x + y * this.width] = color;
  }

  draw(x, y) {
    let canvas = $('#grid')[0];
    let context = canvas.getContext('2d');

    this.setPatternCell(x, y, this.color);
    this.renderGrid();
  }

  fill(x, y) {
    let oldColor = this.getPatternCell(x, y) || this.clearColor;
    if (oldColor == $.color) return;

    let stack = [
      [x, y]
    ];

    while (stack.length) {

      let cell = stack.pop();
      let x = cell[0];
      let y = cell[1];

      this.setPatternCell(x, y, this.color);

      if (x - 1 >= 0 && oldColor == (this.getPatternCell(x - 1, y) || 'ffffff'))
        stack.push([x - 1, y]);

      if (x + 1 < this.width && oldColor == (this.getPatternCell(x + 1, y) || 'ffffff'))
        stack.push([x + 1, y]);

      if (y - 1 >= 0 && oldColor == (this.getPatternCell(x, y - 1) || 'ffffff'))
        stack.push([x, y - 1]);

      if (y + 1 < this.height && oldColor == (this.getPatternCell(x, y + 1) || 'ffffff'))
        stack.push([x, y + 1]);
    }

    this.renderGrid();
  }

  renderGrid() {
    let canvas = $('#grid');
    let context = canvas[0].getContext('2d');

    let size = this.width > this.height ? this.canvasWidth / this.width : this.canvasHeight / this.height;

    if (this.align !== 'normal') {
      size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
    }

    let horizontalOffset = this.align == 'horizontal' ? size / 2: 0;
    let verticalOffset = this.align == 'vertical' ? size / 2 : 0;
    let centeringOffset = (this.canvasWidth - size * this.width - horizontalOffset) / 2;

    canvas.attr('width', canvas.attr('width')); // Clear canvas

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        context.beginPath();
        context.arc(x * size + size / 2 + (!(y % 2) ? horizontalOffset : 0) + centeringOffset, y * size + size / 2 + (x % 2 ? verticalOffset : 0), size / 2 - 1, 0, 2 * Math.PI, false);
        context.fillStyle = '#' + (this.getPatternCell(x, y) || this.clearColor);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }
  }

  save() {
    this.saving = true;

    let canvas = $('#grid');
    let http = new HttpClient();

    if(!this.pattern.find(cell => {
      return cell !== this.pattern[0];
    })){
      this.saving = false;
      return alert('Pattern must have more than one color!');
    }

    this.http.fetch('https://beader-api.herokuapp.com/patterns', {
      method: 'post',
      body: json({
        name: this.name,
        description: '',
        width: this.width,
        height: this.height,
        align: this.align,
        pattern: this.pattern,
        image: canvas[0].toDataURL('image/png')
      })
    })
    .then(response => response.json())
    .then(response => {
      $('#save-button').prop('disabled', false);
      $('#save-button').text('Save');
      this.saving = false;
      this.router.navigateToRoute('pattern', {id: response._id});
    })
    .catch(error => {
      alert('Error: ' + error);
      this.saving = false;
    });
  }
}
