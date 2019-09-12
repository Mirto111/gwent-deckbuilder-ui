import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (

  <div className="topnav">
    <nav>
      <NavLink to="/decks" exact activeClassName="active">
        Decks
      </NavLink>
      <NavLink to="/deckbuilder" activeClassName="active">DeckBuilder</NavLink>
    </nav>
  </div>

);

export default Header;
