import React from 'react';
import Item from './pages/item';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import NewItem from './pages/newItem';

export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Item}/>
            <Route path={"/item/new/:itemId"} component={NewItem}/>
        </Switch>
    </BrowserRouter>
    );
}