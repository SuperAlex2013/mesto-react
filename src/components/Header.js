import logo from '../images/logo.svg';

export default function Header({ logoSrc = logo, logoAlt = 'логотип Mesto', ...otherProps }) {
    return (
        <header className="header page__header" {...otherProps}>
            <img
                className="header__logo"
                src={logoSrc}
                alt={logoAlt}
            />
        </header>
    );
}
