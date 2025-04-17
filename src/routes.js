import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AgentsPage from './pages/AgentsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import PropertyListingPage from './pages/PropertyListingPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/agents" component={AgentsPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/faq" component={FaqPage} />
            <Route path="/properties" component={PropertyListingPage} />
            <Route path="/property/:id" component={PropertyDetailPage} />
            <Route path="/search" component={SearchResultsPage} />
            <Route component={NotFoundPage} />
        </Switch>
    );
};

export default Routes;