import React, { Component } from 'react';
import './Setup.css';

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = { colorNumber: 12, cardsPerColor: 2, showColorNames: 'immediately', colorPaletteName: 'HTMLcolors' };
    }

    handleChange(ev) {
        this.setState({ [ev.target.name]: ev.target.value });
        this.props.shouldSaveHandler();
    }

    showColorNamesOptions = [
        { value: 'immediately', text: 'Immediately', default: true }
        , { value: 'onFound', text: 'On finding all cards of one color', default: false }
        , { value: 'onGameOver', text: 'Only when game is completed', default: false }
    ];

    colorPaletteNameOptions = [
        { value: 'HTMLcolors', text: 'HTML colors', default: true }
        , { value: 'HSLcolors', text: 'HSL colors', default: false }
    ];

    render() {
        const { colorNumber, cardsPerColor, showColorNames, palette } = this.state;
        const { hideSettings, shouldSave } = this.props;

        return (
            <div className="Setup" style={hideSettings ? { display: 'none' } : null}>
                <form className="SetupForm" onSubmit={this.props.changeSettings}>
                    <div className="InputGroup">
                        <label className="InputLabel" for="colorNumber">Number of colors:</label>
                        <input type="number"
                            id="colorNumber"
                            name="colorNumber"
                            value={colorNumber}
                            min={1}
                            max={120}
                            onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="InputGroup">
                        <label className="InputLabel" for="cardsPerColor">Cards per color:</label>
                        <input type="number"
                            id="cardsPerColor"
                            name="cardsPerColor"
                            value={cardsPerColor}
                            min={1}
                            max={20}
                            onChange={this.handleChange.bind(this)}></input>
                    </div>
                    <div className="InputGroup">
                        <label className="InputLabel" for="showColorNames">Display color names:</label>
                        <select name="showColorNames" id="showColorNames" onChange={this.handleChange.bind(this)}>
                            {this.showColorNamesOptions.map(opt =>
                                <option value={opt.value} {...opt.default ? "selected" : null}>{opt.text}</option>
                            )}
                        </select>
                    </div>
                    <div className="InputGroup">
                        <label className="InputLabel" for="colorPaletteName">Select color palette:</label>
                        <select name="colorPaletteName" id="colorPaletteName" onChange={this.handleChange.bind(this)}>
                            {this.colorPaletteNameOptions.map(opt =>
                                <option value={opt.value} {...opt.default ? "selected" : null}>{opt.text}</option>
                            )}
                        </select>
                    </div>

                    <button className="SetupButton" style={shouldSave ? { backgroundColor: 'hsl(30,75%,50%)' } : null}>Save Settings</button>
                </form>
            </div >
        );
    }
}


export default Setup;