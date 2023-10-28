import { useContext } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// store
import DataProvider, { DataContext } from "./store/DataProvider";

// components
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/post/CreatePost";
import DetailView from "./components/details/DetailView";

//styles
import "./App.css";
import EditPost from "./components/post/EditPost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = () => {
  const { isUserAuthenticated } = useContext(DataContext);
  
  return isUserAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {


  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <ToastContainer
            position="bottom-right"
            autoClose={1800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post/:id" element={<DetailView />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
