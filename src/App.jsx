import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/dasboard/Dashboard";
import LoginPage from "@pages/auth/LoginPage";
import SignupPage from "@pages/auth/SignupPage";
import Clients from "@pages/client/Clients";
import Test from "@pages/client/Test";
import Layout from "@comp/misc/Layout";
import { useContext } from "react";
import { AuthContext } from "@src/Auth";
import ProtectedRoute from "@src/ProtectedRoute";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Box bg="bg.100">
      <Layout>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={currentUser ? true : false}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="clients"
            element={
              <ProtectedRoute isAllowed={currentUser ? true : false}>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route path="test" element={<Test />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
