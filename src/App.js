import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { AuthContextProvider, useAuthState } from "./firebase";

import { Home } from "./Home";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

const PrivateRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Link to="/"> Home </Link> | <Link to="/login"> Login </Link> |
          <Link to="/signup"> Signin </Link>
        </div>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

function RequireAuth({ children }) {
  let auth = useAuthState();
  let location = useLocation();
  console.log(auth);

  if (auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
