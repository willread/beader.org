import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Designer {
  constructor(http) {
    this.http = http;
  }

  // Palette colors

  colors = ['000000', '002000', '003400', '006700', '009b00', '00ce00', '00ff00', '070707', '000035', '003333', '006731', '009b2c', '00ce23', '00ff10', '0e0e0e', '000068', '003268', '006667', '009a64', '00ce62', '00ff5d', '151515', '00009c', '002f9c', '00659b', '009a9a', '00cd98', '00ff95', '1c1c1c', '0000d0', '0029cf', '0063cf', '0099cf', '00cccd', '00ffcc', '232323', '0000ff', '0021ff', '0060ff', '0096ff', '00cbff', '00ffff', '2a2a2a', '340000', '333300', '316700', '2d9a00', '26ce00', '1bff00', '313131', '340034', '333333', '316731', '2d9a2b', '26ce22', '1aff0f', '383838', '330068', '333268', '306666', '2d9a64', '26ce61', '1aff5c', '3f3f3f', '32009b', '332f9c', '30649a', '2d999a', '25cd98', '19ff96', '464646', '3300d0', '3129cf', '3063cf', '2c99cf', '24cccd', '17ffcb', '4d4d4d', '3100ff', '3021ff', '2e60ff', '2a96ff', '23cbff', '15ffff', '545454', '670000', '673300', '676700', '649a00', '62ce00', '5fff00', '5b5b5b', '670033', '673332', '666730', '659a2a', '62ce21', '5eff0b', '626262', '670068', '673167', '666666', '649a64', '61cd60', '5eff5c', '696969', '67009c', '672e9c', '66659b', '64999a', '61cd97', '5eff95', '707070', '6600cf', '6729d0', '6663cf', '6498ce', '62cdcd', '5dffcb', '777777', '6700ff', '6621ff', '655fff', '6497ff', '61cbff', '5dffff', '7e7e7e', '9b0000', '9a3200', '9a6700', '999a00', '98ce00', '96ff00', '858585', '9a0031', '9b3230', '9a672e', '999a28', '98ce1e', '96ff05', '8c8c8c', '9b0067', '9a3066', '9a6665', '999a64', '97cd60', '95ff5b', '939393', '9b009b', '9a2d9a', '9a659a', '999999', '98cd97', '95ff94', '9a9a9a', '9a00cf', '9a28cf', '9a63cf', '9897cd', '97cccc', '95ffcb', 'a1a1a1', '9a00ff', '9a1fff', '995fff', '9997ff', '97cbff', '95ffff', 'a8a8a8', 'cf0000', 'cf3200', 'ce6600', 'cd9a00', 'cdce00', 'cbff00', 'afafaf', 'cf002e', 'ce312d', 'ce662a', 'cd9a24', 'cccd19', 'cbff00', 'b6b6b6', 'ce0065', 'ce3065', 'cd6563', 'cd9962', 'cccd5e', 'cbff5a', 'bdbdbd', 'ce009a', 'ce2d9a', 'cd6499', 'cd9998', 'cccc96', 'cbff94', 'c4c4c4', 'ce00cf', 'ce27ce', 'ce62ce', 'cd97cd', 'cccccc', 'cbffcb', 'cbcbcb', 'ce00ff', 'ce1eff', 'cd5fff', 'cd96ff', 'cccbff', 'caffff', 'd2d2d2', 'ff0000', 'ff3000', 'ff6600', 'ff9a00', 'ffce00', 'ffff00', 'd9d9d9', 'ff002a', 'ff3028', 'ff6525', 'ff991e', 'ffcd0f', 'ffff00', 'e0e0e0', 'ff0064', 'ff2e64', 'ff6563', 'ff9960', 'ffcd5d', 'ffff58', 'e7e7e7', 'ff0099', 'ff2b99', 'ff6398', 'ff9998', 'ffcd96', 'ffff92', 'eeeeee', 'ff00ce', 'ff25ce', 'ff61cd', 'ff98cd', 'ffcccb', 'ffffc9', 'f5f5f5', 'ff00ff', 'ff1cff', 'ff5eff', 'ff96ff', 'ffcbff', 'ffffff'];

  // Defaults

  width = 10;
  height = 10;
  name = 'Untitled Pattern';
  align = 'normal';
  mode = 'brush';
  color = '000000';
  clearColor = 'ffffff';
  drawing = false

  pattern = [];

  attached() {

    // Set color

    $('#color').css('backgroundColor', '#' + this.color);

    // Init pattern

    for(let ii = 0; ii < this.width * this.height; ii++){
      this.pattern.push(this.clearColor);
    }

    // We're editing a pattern, load it from the backend

    // if($routeParams.id){
    //     $http.get('/pattern/' + $routeParams.id + '.json').
    //         success(function(pattern){
    //             this.width = pattern.width;
    //             this.height = pattern.height;
    //             this.name = pattern.name;
    //             this.align = pattern.align;
    //             this.mode = pattern.mode;
    //             this.data = pattern.data;
    //             this._id = pattern._id;
    //
    //             this.renderGrid();
    //         });
    // }

    this.renderPalette();
    this.renderGrid();
  }

  // Render render the palette canvas

  renderPalette() {
    let palette = $('#palette')[0];
    let context = palette.getContext('2d');

    let width = ($(palette).width() - 1) / 7 - 1;
    let height = ($(palette).height() - 1) / 36 - 1;

    for (let y = 0; y < 36; y++) {
      for (let x = 0; x < 7; x++) {
        context.beginPath();
        context.fillStyle = '#' + this.colors[y * 7 + x];
        context.fillRect(x * (width + 1), y * (height + 1), width, height);
        context.strokeStyle = '#ffffff';
        context.lineWidth = 1;
        context.stroke();
      }
    }
  }

  selectColor($event) {
    let palette = $('#palette')[0];
    let context = palette.getContext('2d');

    let width = Math.floor(($(palette).width() - 1) / 7 - 1);
    let height = Math.floor(($(palette).height() - 1) / 36 - 1);

    let offsetX = $event.pageX - $(palette).offset().left;
    let offsetY = $event.pageY - $(palette).offset().top;

    let x = Math.floor(offsetX / (width + 1));
    let y = Math.floor(offsetY / (height + 1));

    this.color = this.colors[y * 7 + x];

    $('#color').css('backgroundColor', '#' + this.color);
  }

  setMode(mode) {
    this.mode = mode;
  }

  setAlign(align) {
    this.align = align;
    this.renderGrid();
  }

  startDrawing($event) {
    this.drawing = true;
  }

  stopDrawing($event) {
    this.drawing = false;
  }

  drag($event) {
    if (this.drawing && this.mode == 'brush') {
      this.draw($event);
    }
  }

  click($event) {
    if (this.mode == 'brush') {
      this.stopDrawing($event);
      this.draw($event);
    }

    if (this.mode == 'fill') {
      let canvas = $('#grid')[0];
      let context = canvas.getContext('2d');

      let size = this.width > this.height ? $(canvas).width() / width : $(canvas).height() / this.height;
      let x = Math.floor($event.offsetX / size);
      let y = Math.floor($event.offsetY / size);

      this.fill($event, x, y);
    }
  }

  getPatternCell(x, y) {
    return this.pattern[x + y * this.width];
  }

  setPatternCell(x, y, color) {
    this.pattern[x + y * this.width] = color;
  }

  draw($event) {
    let canvas = $('#grid')[0];
    let context = canvas.getContext('2d');

    let size = this.width > this.height ? $(canvas).width() / width : $(canvas).height() / this.height;
    let x = Math.floor($event.offsetX / size);
    let y = Math.floor($event.offsetY / size);

    this.setPatternCell(x, y, this.color);
    this.renderGrid($event);
  }

  fill($event, x, y) {
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

    this.renderGrid($event);
  }

  renderGrid($event) {
    var canvas = $('#grid');
    var context = canvas[0].getContext('2d');

    var size = this.width > this.height ? canvas.width() / this.width : canvas.height() / this.height;

    if (this.align !== 'normal') {
      size = this.width > this.height ? size - size / this.width / 2 : size - size / this.height / 2;
    }

    let horizontalOffset = this.align == 'horizontal' ? size / 2 : 0;
    let verticalOffset = this.align == 'vertical' ? size / 2 : 0;

    canvas.attr('width', canvas.attr('width')); // Clear canvas

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        context.beginPath();
        context.arc(x * size + size / 2 + (y % 2 ? horizontalOffset : 0), y * size + size / 2 + (x % 2 ? verticalOffset : 0), size / 2 - 1, 0, 2 * Math.PI, false);
        context.fillStyle = '#' + (this.getPatternCell(x, y) || this.clearColor);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#ddd';
        context.stroke();
      }
    }
  }

  save() {
    $('#save-button').prop('disabled', true);
    $('#save-button').text('Saving...');

    let canvas = $('#grid');
    let http = new HttpClient();

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
    .then(response => {
      $('#save-button').prop('disabled', false);
      $('#save-button').text('Save');
    })
    .catch(error => {
      alert('Error: ' + error);
    });
  }
}
