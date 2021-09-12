import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getCartItems} from './actions/actionCreators';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Contacts from './components/Contacts';
import Page404 from './components/Page404';
import About from './components/About';
import Banner from './components/Banner';
import Home from './components/Home';
import PageCatalog from './components/PageCatalog';
import CatalogItem from './components/CatalogItem';
import Cart from './components/Cart';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <main className="container">
          <div className="col">
            <section className="top-sales">
            <Banner />
            <Switch>
              <Route path="/cart" component={Cart} />
              <Route path="/products/:id" component={CatalogItem} />
              <Route path="/about" component={About} />
              <Route path="/catalog" component={PageCatalog} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/" component={Home} exact/>
              <Route component={Page404} />
            </Switch>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
