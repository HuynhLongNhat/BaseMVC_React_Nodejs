import "./App.scss";

import NavHeader from "./Navigations/NavHeader";
import { useContext, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import { UserContext } from "./context/userProvider";
import { Hourglass } from 'react-loader-spinner';
import { Scrollbars } from 'react-custom-scrollbars';
const App = () => {


  const { user } = useContext(UserContext)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight)
  }, [user])
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }} >
      <div className="app">
        {user && user.isLoading ?
          <div className="loading-container">
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <BrowserRouter>
              <div className="app-header">
                <NavHeader />
              </div>
              <div className="app-container">
                <AppRoutes />
              </div>
            </BrowserRouter></>
        }
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        // transition: Bounce,
        />
      </div>
    </Scrollbars>
  );
}

export default App;
