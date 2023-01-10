import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from './pages/toy-details';
import { ToyEdit } from './pages/toy-edit';
import { ToyAdd } from './pages/toy-add';
import LoginFormik from './pages/login-page';
import './assets/style/main.css'
import SignUp from "./pages/signup-page";

export function App() {



  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<LoginFormik />} path="/login" />
              <Route element={<SignUp />} path="/signup" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/details/:toyId" />
              <Route element={<ToyAdd />} path="/add" />
              <Route element={<ToyEdit />} path="/edit/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}
