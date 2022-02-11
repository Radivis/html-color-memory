import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Setup from './Setup';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorNumber: 12
      , cardsPerColor: 2
      , colorPaletteName: 'HTMLcolors'
      , showColorNames: 'immediately'
      , hideSettings: true
      , shouldReset: false
      , shouldSave: false
    }
  }

  changeSettings(ev) {
    ev.preventDefault();
    let settings = {};
    const inputs = ev.target;
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      settings[input.name] = input.value;
      settings.shouldSave = false;
    }
    this.setState((prevState, props) => {
      if (prevState.colorNumber !== settings.colorNumber
        || prevState.cardsPerColor !== settings.cardsPerColor
        || prevState.colorPaletteName !== settings.colorPaletteName
      ) {
        settings.shouldReset = true;
      }
      return settings;
    })
  }

  shouldResetHandler() {
    this.setState({ shouldReset: false })
  }

  shouldSaveHandler() {
    this.setState({ shouldSave: true })
  }

  toggleSettings() {
    this.setState((prevState, props) => {
      const newHideSettings = !prevState.hideSettings;
      return { hideSettings: newHideSettings };
    })
  }

  defaultColors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "BlanchedAlmond",
    "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate",
    "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod",
    "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange",
    "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray",
    "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue",
    "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod",
    "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki",
    "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan",
    "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon",
    "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow",
    "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid",
    "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise",
    "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy",
    "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
    "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue",
    "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen",
    "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen",
    "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke",
    "Yellow", "YellowGreen"];

  generateHSLColors() {
    const colors = [];
    for (let hue = 0; hue < 360; hue += 30) { // red, orange, yellow, chartreuse, green, teal, cyan, azure, blue, indigo, violet, purple
      for (let saturation = 25; saturation <= 100; saturation += 25) { // grayish, faded, pastel ,vivid
        for (let lightness = 25; lightness < 100; lightness += 25) { // light, medium, dark
          colors.push(`hsl(${hue},${saturation}%,${lightness}%)`);
        }
      }
    }
    colors.push("white");
    return colors;
  }

  generateSimpleHSLColors() {
    const colors = [];
    for (let hue = 0; hue < 360; hue += 60) { // red, yellow, green, cyan, blue, violet
      for (let saturation = 50; saturation <= 100; saturation += 50) { // faded, vivid
        for (let lightness = 25; lightness < 100; lightness += 50) { // light, dark
          colors.push(`hsl(${hue},${saturation}%,${lightness}%)`);
        }
      }
    }
    colors.push("white");
    return colors;
  }

  pickColorPalette() {
    const { colorPaletteName } = this.state;
    const colorPalettes = new Map;
    colorPalettes.set("HTMLcolors", this.defaultColors);
    colorPalettes.set("HSLcolors", this.generateHSLColors());
    colorPalettes.set("SimpleHSLcolors", this.generateSimpleHSLColors());
    return colorPalettes.get(colorPaletteName);
  }

  render() {
    const { colorPalette, colorNumber, cardsPerColor, showColorNames, hideSettings, shouldReset, shouldSave } = this.state;
    return (
      <div className="App">
        <Setup
          changeSettings={this.changeSettings.bind(this)}
          hideSettings={hideSettings}
          shouldSave={shouldSave}
          shouldSaveHandler={this.shouldSaveHandler.bind(this)} />
        <Game
          colorPalette={this.pickColorPalette.bind(this)()}
          colorNumber={colorNumber}
          cardsPerColor={cardsPerColor}
          showColorNames={showColorNames}
          hideSettings={hideSettings}
          shouldReset={shouldReset}
          shouldResetHandler={this.shouldResetHandler.bind(this)}
          showSettingsCallback={this.toggleSettings.bind(this)}
        />
      </div>
    );
  }


}

export default App;
