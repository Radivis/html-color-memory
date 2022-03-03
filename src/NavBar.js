import React, { Component } from 'react';
import './NavBar.css';

function NavBar(props) {
    const { hideSettings, shouldReset } = props;
    return (
        <div className="menu" key="menu">
            <a className="menu-item" key="game-name">HTML Colors Memory Game</a>
            <button type="button" key="settings-button" className="menu-button" onClick={props.showSettingsCallback}>{hideSettings ? "Display Settings" : "Hide Settings"}</button>
            <button type="button" key="new-game-button" className="menu-button" style={shouldReset ? { backgroundColor: 'hsl(30,75%,50%)' } : null} onClick={props.resetCallback}>New Game</button>
            <button type="button" key="hide-cards-button" className="menu-button" onClick={props.restartCallback}>Hide Cards</button>

        </div>
    )
}


export default NavBar;
