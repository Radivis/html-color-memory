import React from 'react';
import './Card.css'

function Card(props) {
    const { index, color, gameOver, clickHandler, scale } = props;
    let { turned, found, showColorNames } = props;
    // let cardStyle = turned ? { backgroundColor: color } : { backgroundColor: "black" };

    const fontSize = Math.floor(24 * scale);
    const cardSize = Math.floor(160 * scale);
    const cardBorder = Math.floor(10 * scale);
    const cardBorderRadius = Math.floor(20 * scale);
    const cardMargin = Math.floor(5 * scale);
    const cardPadding = Math.floor(10 * scale);

    const cardStyle = {
        fontSize: `${fontSize}px`,
        width: `${cardSize}px`,
        height: `${cardSize}px`,
        border: `black ${cardBorder}px solid`,
        borderRadius: `${cardBorderRadius}px`,
        margin: `${cardMargin}px`,
        padding: `${cardPadding}px`,
        backgroundColor: turned ? color : "black"
    }

    function cardName() {
        if (showColorNames === 'onGameOver' && !gameOver) {
            return null;
        }

        if (showColorNames === 'onFound' && !found) {
            return null;
        }

        if (turned) {
            if (color.slice(0, 3) === "hsl") {
                let components = color.split(",");
                components[0] = components[0].slice(4, 7);
                components[1] = components[1].slice(0, 2);
                components[2] = components[2].slice(0, 2);
                let colorName = [];
                const hues = {
                    0: "red"
                    , 15: "orange red"
                    , 30: "orange"
                    , 45: "amber"
                    , 60: "yellow"
                    , 75: "lime"
                    , 90: "chartreuese"
                    , 105: "harlequin"
                    , 120: "green"
                    , 135: "spring green"
                    , 150: "teal"
                    , 165: "turquoise"
                    , 180: "cyan"
                    , 195: "sky blue"
                    , 210: "azure"
                    , 225: "navy blue"
                    , 240: "blue"
                    , 255: "purple"
                    , 270: "indigo"
                    , 285: "orchid"
                    , 300: "magenta"
                    , 315: "pink"
                    , 330: "rose"
                    , 345: "crimson"
                };
                const saturations = { 12: "grayest", 25: "grayish", 37: "dull", 50: "faded", 62: "muted", 75: "pastel", 87: "brilliant", 10: "vivid" };
                const lightnesses = { 12: "darkest", 25: "dark", 37: "shadowy", 50: "medium", 62: "soft", 75: "light", 87: "shining" };
                return `${lightnesses[components[2]]} ${saturations[components[1]]} ${hues[components[0]]}`;
            } else if (color.slice(0, 3) === "rgb") {
                return color.slice().split(',').join(" ");
            } else { // HTML colors
                return nameSplit(color);
            }
        }
    }

    function nameSplit(name) { // Names should be split before each capital letter, so that they can wrap
        const capitalIndices = [0];
        const nameArray = name.slice('');
        for (let i = 1; i < nameArray.length; i++) {
            if (nameArray[i] === nameArray[i].toUpperCase()) {
                capitalIndices.push(i);
            }
        }
        capitalIndices.push(name.length);

        const parts = [];
        for (let j = 0; j < capitalIndices.length - 1; j++) {
            parts.push(nameArray.slice(capitalIndices[j], capitalIndices[j + 1]));
        }
        return parts.join(" ");
    }

    return (
        <div id={index} key={index} className="card" style={cardStyle} onClick={clickHandler}>
            <span className="cardText">{cardName()}</span>
        </div>
    )
}

export default Card;