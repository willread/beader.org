import React, { Component } from 'react';

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
  render() {
    // align, paletteWidth, paletteHeight, width, height, name, saving, canvasWidth, canvasHeight, previewWidth, previewHeight

    return (
      <div id='editor'>
        <div className='tools'>
            <div className='button-group'>
              <button className={align === 'pixel' ? 'active' : ''} onClick={this.setAlign.bind(this, 'pixel')} id='align-pixel'>
                <img src={images.alignPixel} width='30' height='30' />
              </button>
              <button className={align === 'normal' ? 'active' : ''} onClick={this.setAlign.bind(this, 'normal')} id='align-normal'>
                <img src={images.alignNormal} width='30' height='30' />
              </button>
              <button className={align === 'horizontal' ? 'active' : ''} onClick={this.setAlign.bind(this, 'horizontal')} id='align-horizontal'>
                <img src={images.alignHorizontal} width='30' height='30' />
              </button>
              <button className={align === 'vertical' ? 'active' : ''} onClick={this.setAlign.bind(this, 'vertical')} id='align-vertical'>
                <img src={images.alignVertical} width='30' height='30' />
              </button>
            </div>

            <div className='button-group'>
              <button className={mode === 'brush' ? 'active' : ''} onClick={this.setMode.bind(this, 'brush')} id='mode-brush'>
                <img src={images.brush} width='30' height='30' />
              </button>
              <button className={mode === 'fill' ? 'active' : ''} onClick={this.setMode.bind(this, 'fill')} id='mode-fill'>
                <img src={images.fill} width='30' height='30' />
              </button>
            </div>

            <div className='button-group show-overflow color-wrapper' onMouseOver={this.showPalette.bind(this)} onMouseLeave={this.hidePalette.bind(this, 400)}>
              <button id='color'>
                <img src={images.picker} width='30' height='30' />
              </button>

              <div id='palette-wrapper'>
                <canvas
                  onClick={e => this.selectColor.bind(this, e, true)}
                  onMouseMove={e => this.selectColor.bind(this, e)}
                  onMouseDown={e => this.selectColor.bind(this, e, true)}
                  onMouseLeave={this.resetColor.bind(this)}
                  id='palette'
                  width={paletteWidth}
                  height={paletteHeight}
                ></canvas>
              </div>
            </div>

            <div className='right'>
              <div className='select'>
                <select value={width} onChange={this.changePatternSize.bind(this)}>
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
                <select value={height} onChange={this.changePatternSize.bind(this)}>
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

              <input value={name} type='text' placeholder='Pattern Name' />
              {!app.isAuthenticated && <button disabled className='save-button'>Sign In To Save</button>}
              { app.isAuthenticated &&
                <button onClick={this.save.bind(this)} disabled={saving} className='save-button'>
                  <span>{saving ? 'Saving...' : 'Save'}</span>
                </button>
              }
            </div>
        </div>

        <div className='grid-wrapper'>
          <canvas
            onMouseMove={e => this.drag.bind(this, e)}
            onClick={e => this.click.bind(this, e)}
            onMouseDown={e => this.startDrawing.bind(this, e)}
            onMouseLeave={e => this.stopDrawing.bind(this, e)}
            id='grid'
            width={canvasWidth}
            height={canvasHeight}
          ></canvas>

          <canvas
            id='preview'
            width={previewWidth}
            height={previewHeight}
          ></canvas>
        </div>
      </div>
    );
  }
}

export default Designer;
