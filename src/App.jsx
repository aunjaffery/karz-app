import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "@comp/misc/Layout";
import LoginPage from "@pages/auth/LoginPage";
import Dashboard from "@pages/dasboard/Dashboard";
import SignupPage from "@pages/auth/SignupPage";
import Clients from "@pages/client/Clients";
import Test from "@pages/client/Test";
import ProtectedRoute from "@src/services/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import useBoundStore from "./store/Store";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //react-query enabled!! will not run unless user_id
  const navigate = useNavigate();
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });
  useEffect(() => {
    // useEffect only if you want whole App private.
    if (authCheck === false) navigate("login");
    //remove this useEffect if You want some public pages in App.
    //Route can handle private pages individually through ProtectedRoute
  }, [authCheck]);

  return (
    <Box bg="bg.100">
      <Layout>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="clients"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/*404*/}
          <Route path="*" element={<Test />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default App;
