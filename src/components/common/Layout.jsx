import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Advertisement from '../ads/Advertisement';
import Notification from '../ads/Notification';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />

            {/* Advertisement and notification components */}
            <Advertisement />
            <Notification />
        </div>
    );
};

export default Layout;