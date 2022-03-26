import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Coba from "./coba";
import { AuthContextProvider, useAuthState } from "./firebase";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthtenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  let location = useLocation();

  console.log("AuthRute = ", { props });

  if (isAuthenticated) {
    alert("you are not logged in");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props;
};

const UnauthtenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/ />" />
      }
    />
  );
};

export default function Apps() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <link to="/"> Home </link> |<link to="/login"> Login </link> |
          <link to="/signup"> Signin </link>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

