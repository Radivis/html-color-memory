import React, { Component } from 'react';
import './NavBar.css';

function NavBar(props) {
    const { hideSettings, shouldReset } = props;
    return (
        <div className="menu">
            <a className="menu-item">HTML Colors Memory Game</a>
            <button type="button" className="menu-button" onClick={props.showSettingsCallback}>{hideSettings ? "Display Settings" : "Hide Settings"}</button>
            <button type="button" className="menu-button" style={shouldReset ? { backgroundColor: 'hsl(30,75%,50%)' } : null} onClick={props.resetCallback}>New Game</button>
            <button type="button" className="menu-button" onClick={props.restartCallback}>Hide Cards</button>

        </div>
    )
}


export default NavBar;
