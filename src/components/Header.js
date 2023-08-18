import React from 'react';
import logo from '../images/logo.svg';

function Logo() {
    return (
        <img
            className="header__logo"
            src={logo}
            alt="логотип Mesto"
        />
    );
}

export default function Header({ className }) {
    const headerClass = className ? `header ${className}` : 'header';

    return (
        <header className={headerClass}>
            <Logo />
        </header>
    );
}
