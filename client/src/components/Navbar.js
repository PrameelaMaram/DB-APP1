import React,{useState} from 'react';
import { Link} from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import SubMenu from './SubMenu';

import styled from 'styled-components';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
overflow-y: scroll;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 100;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Nav = styled.div`
  background: #15171c;
  height: 50px;

  width:auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



function Navbar() {
    const [sidebar,setSidebar]=useState(false)
    const showSidebar=()=>setSidebar(!sidebar)
    return (
        <div>
        <IconContext.Provider value={{color:'#fff'}}>
        <Nav>
          <NavIcon to='#'>
          <FaIcons.FaBars onClick={showSidebar} /> 
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar} onClick={showSidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
                  {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
    </SidebarWrap>
            </SidebarNav>
            </IconContext.Provider>
        </div>
    )
}

export default Navbar;
