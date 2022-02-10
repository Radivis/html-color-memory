import React from 'react';
import './Card.css'

function Card(props) {
    const { index, color, gameOver, clickHandler } = props;
    let { turned, found, showColorNames } = props;
    let cardStyle = turned ? { backgroundColor: color } : { backgroundColor: "black" };

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
                const hues = { 0: "red", 30: "orange", 60: "yellow", 90: "chartreuese", 120: "green", 150: "teal", 180: "cyan", 210: "azure", 240: "blue", 270: "indigo", 300: "violet", 330: "purple" };
                const saturations = { 25: "grayish", 50: "faded", 75: "pastel", 10: "vivid" };
                const lightnesses = { 25: "dark", 50: "medium", 75: "light" };
                return `${lightnesses[components[2]]} ${saturations[components[1]]} ${hues[components[0]]}`;
            } else {
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