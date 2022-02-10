import React, { Component } from 'react';
import { render } from 'react-dom';
import NavBar from './NavBar';
import Card from './Card';
import './Game.css';


class Game extends Component {
    constructor(props) {
        super(props);
        this.startGame();
    }

    startGame() {
        const { colorPalette, colorNumber, cardsPerColor, showColorNames, shouldReset, shouldResetHandler } = this.props;
        this.state = { colors: this.initializeColors(colorPalette, colorNumber), found: [], turned: [], cooldown: false, wrongGuesses: 0, gameOver: false };
        this.state.cards = this.initializeCards(this.state.colors, cardsPerColor);
    }

    async resetGame() {
        const { colorPalette, colorNumber, cardsPerColor, showColorNames, shouldReset, shouldResetHandler } = this.props;
        await this.setState({ colors: this.initializeColors(colorPalette, colorNumber), found: [], turned: [], cooldown: false, wrongGuesses: 0, gameOver: false });
        await this.setState({ cards: this.initializeCards(this.state.colors, cardsPerColor) });
        shouldResetHandler();
    }

    restartGame() {
        let guesses = this.state.wrongGuesses;
        this.setState({ found: [], turned: [], cooldown: false, wrongGuesses: guesses, gameOver: false });
    }

    getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    initializeColors(palette, colorNumber) {
        const remainingColors = palette.slice();
        const gameColors = [];
        for (let i = 0; i < colorNumber; i++) {
            let colorIndex = this.getRandomIndex(remainingColors);
            gameColors.push(remainingColors[colorIndex]);
            remainingColors.splice(colorIndex, 1);
        }
        return gameColors;
    }

    initializeCards(colors, cardsPerColor) {
        const cardNumber = colors.length * cardsPerColor;
        const cards = Array(cardNumber).fill();
        const remainingColors = colors.slice();
        const remainingIndices = [];
        for (let i = 0; i < cards.length; i++) {
            remainingIndices.push(i);
        } // remainingIndices = [0,...,cardNumber -1]

        while (remainingIndices.length > 0) {
            // splice returns random Color and removes it from remainingColors
            let randomColor = remainingColors.splice(this.getRandomIndex(remainingColors), 1)[0];
            let randomIndices = []
            for (let i = 0; i < cardsPerColor; i++) {
                // splice selects random Index and removes it from remainingIndices
                randomIndices[i] = remainingIndices.splice(this.getRandomIndex(remainingIndices), 1)[0];
                cards[randomIndices[i]] = randomColor;
            }
        }

        return cards;
    }

    async turnCard(ev) {
        if (this.state.cooldown === true) { // After having revealed cards, cards cannot been clicked!
            return null;
        }
        const index = Number(ev.target.id);

        if (this.state.turned.includes(index)) { // Don't allow turned cards to be double clicked!
            return null;
        }

        await this.setState((prevState, props) => { // Add the selected card to the turned cards. Note that setState is asynchronous!
            const turnedCards = prevState.turned.slice();
            turnedCards.push(index);
            return { turned: turnedCards };
        })

        const { cardsPerColor } = this.props;

        if (this.state.turned.length % cardsPerColor !== 1) { // first cards were already revealed!
            const revealed = this.state.turned.slice();
            const revealedIndices = revealed.filter(ind => !this.state.found.includes(ind)); // remove cards that are already found

            // hide cards that don't match
            if (this.state.cards[index] !== this.state.cards[revealedIndices[0]]) {
                const newWrongGuesses = this.state.wrongGuesses + 1;
                this.setState({ cooldown: true, wrongGuesses: newWrongGuesses });
                setTimeout(() => this.setState((prevState, props) => {
                    const turnedCards = prevState.turned.slice();
                    const foundCards = turnedCards.filter(ind => ind !== index && !revealedIndices.includes(ind));
                    return { turned: foundCards, cooldown: false };
                }), 1000)
                // if all cards match, store them in the "found" array!
            } else if (this.state.turned.length % cardsPerColor === 0) {
                this.setState((prevState, props) => {
                    const revealedCards = prevState.turned.slice();
                    return { found: revealedCards };
                })
                if (this.state.found.length === this.state.cards.length) {
                    this.setState({ gameOver: true });
                }
            }
        }
        /* Original solution for only two cards per Color:
        if (this.state.turned.length % 2 === 1) { // first card was already revealed!
            const revealed = this.state.turned.slice();
            const revealedIndex = Number(revealed.filter(ind => !this.state.found.includes(ind))[0]); // remove cards that are already found

            if (index !== revealedIndex && this.state.cards[index] !== this.state.cards[revealedIndex]) { // hide cards that don't match
                const newWrongGuesses = this.state.wrongGuesses + 1;
                this.setState({ cooldown: true, wrongGuesses: newWrongGuesses });
                setTimeout(() => this.setState((prevState, props) => {
                    const turnedCards = prevState.turned.slice();
                    const foundCards = turnedCards.filter(ind => ind !== index && ind !== revealedIndex);
                    return { turned: foundCards, cooldown: false };
                }), 1000)
            } else if (index !== revealedIndex && this.state.cards[index] === this.state.cards[revealedIndex]) { // add found cards
                this.setState((prevState, props) => {
                    const revealedCards = prevState.turned.slice();
                    return { found: revealedCards };
                })
            }
        } */
    }

    wrongGuessesStyle(guesses) {
        const cardNumber = this.props.colorNumber * this.props.cardsPerColor;
        // Idea: Go from black to blue and then to cyan, green, yellow, red
        // hsl(240,50%,0%) -> hsl(240,50%,50%)
        let ratio = 100 * guesses / cardNumber;
        if (guesses <= cardNumber / 2) {
            return { color: `hsl(240,50%,${ratio}%)` }
        } else if (guesses <= 3 * cardNumber) { // hsl(240,50%, 50%) -> hsl(0,50%,50%)
            let hue = 290 - 100 * guesses / cardNumber;
            return { color: `hsl(${hue},50%,50%)` }
        } else if (guesses <= 6 * cardNumber) { // hsl(0,50%, 50%) -> hsl(0,100%,50%)
            let saturation = 50 * guesses / (3 * cardNumber)
            return { color: `0,${saturation}%,50%)` }
        } else {
            return { color: 'hsl(0,50%,50%)' }
        }
    }

    render() {
        let { wrongGuesses } = this.state;
        return (
            <div className="gameContainer">
                <header className="App-header">
                    <NavBar
                        restartCallback={this.restartGame.bind(this)}
                        resetCallback={this.resetGame.bind(this)}
                        showSettingsCallback={this.props.showSettingsCallback}
                        hideSettings={this.props.hideSettings}
                        shouldReset={this.props.shouldReset} />
                </header>
                <span className="wrongGuesses">Wrong guesses:
                    <span className="wrongGuesses" style={this.wrongGuessesStyle(wrongGuesses)}> {wrongGuesses}</span>
                </span>
                <div className="memoryCards">
                    {this.state.cards.map((card, index) => <Card
                        index={index}
                        color={card}
                        clickHandler={this.turnCard.bind(this)}
                        turned={this.state.turned.includes(index) ? true : false}
                        found={this.state.found.includes(index) ? true : false}
                        gameOver={this.state.gameOver}
                        showColorNames={this.props.showColorNames} />)}
                </ div>

            </div >
        );
    }
}

export default Game;
