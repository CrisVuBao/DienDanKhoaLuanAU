import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { basicRouter, loggedInRoutes, adminRouter } from "./client/router";
import React from "react";

export const MyContext = React.createContext();

function App() {
  
  const PrivateRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem("token");
    return isAuth ? children : <Navigate to="/" />;
  };

  const AdminRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem("token");
    const role = localStorage.getItem("UserGroup");
    return isAuth && (role === "ADMIN" || role === "Admin") ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {basicRouter.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout;
          return (
            <Route
              key={`basic_${index}`}
              path={item.path}
              element={
                  <MyContext.Provider value={item.type}>
                    <Layout>
                      <Page />
                    </Layout>
                  </MyContext.Provider>
              }
            />
          );
        })}
        {loggedInRoutes.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout;
          return (
            <Route
              key={`user_${index}`}
              path={item.path}
              element={
                <PrivateRoute>
                  <MyContext.Provider value={item.type}>
                    <Layout>
                      <Page />
                    </Layout>
                  </MyContext.Provider>
                </PrivateRoute>
              }
            />
          );
        })}
        {adminRouter.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout;
          return (
            <Route
              key={`admin_${index}`}
              path={item.path}
              element={
                <AdminRoute>
                  <MyContext.Provider value={item.type}>
                    <Layout>
                      <Page />
                    </Layout>
                  </MyContext.Provider>
                </AdminRoute>
              }
            />
          );
        })}
        {/* Nếu không có route nào khớp, chuyển hướng về trang chủ */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
