import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logoo from '../logoo.png';
import styled from "styled-components";
import { ButtonContainer } from './Button';

export default class Navbar extends Component {
  render() {
    const style = {
      width: 39,
    };
    return (
      <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
        <Link to='/'>
           <img style={style} src={logoo} alt="store" className="navbar-brand "/>
        </Link>
        <ul className="navbar-nav aligh-item-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
            products
            </Link>
          </li>
        </ul>
        <Link to='/cart' className='ml-auto'>
          <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-cart-plus" />
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    )
  }
}

const NavWrapper = styled.nav`
  background: #2a2a72 ! important;
  .nav-link {
    color: #f3f3f3 ! important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
