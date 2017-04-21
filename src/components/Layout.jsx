import React from 'react'
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import LinkService from './linkService/LinkService.jsx'

const Layout = ({ location, children }) => {
    return (
        <div className="index-container">
            <TopPanel location={location.pathname}/>
            { children }
            <Footer />
            <LinkService />
        </div>
    );
}

export default Layout;
