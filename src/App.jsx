import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "@comp/misc/Layout";
import LoginPage from "@pages/auth/LoginPage";
import Dashboard from "@pages/dasboard/Dashboard";
import TransDetail from "@pages/transactions/TransDetail";
import SignupPage from "@pages/auth/SignupPage";
import Clients from "@pages/client/Clients";
import PageNotFound from "@comp/placeholders/PageNotFound";
import Stats from "@pages/stats/Stats";
import Expense from "@pages/expense/Expense";
import Settings from "@pages/settings/Settings";
import Guide from "@pages/guide/Guide";
import Profile from "@pages/profile/Profile";
import AboutMe from "@pages/aboutme/AboutMe";
import Terms from "@pages/terms/Terms";
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
  //  useEffect(() => {
  //    // useEffect only if you want whole App private.
  //    if (authCheck === false) navigate("login");
  //    //remove this useEffect if You want some public pages in App.
  //    //Route can handle private pages individually through ProtectedRoute
  //  }, [authCheck]);

  return (
    <Box>
      <Layout>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="loan"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="expense"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="stats"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="clients"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path="transaction/:trans_id"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <TransDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/profile"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/aboutme"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <AboutMe />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/guide"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Guide />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings/terms"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Terms />
              </ProtectedRoute>
            }
          />
          {/*404*/}
          <Route
            path="*"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
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
