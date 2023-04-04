import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages//Authentication/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <div className="App">
      <Route path="/" component={LoginPage} exact />
      <Route path="/signup" component={SignupPage} exact />
      <Route path="/home" component={HomePage} exact />
      <Route path="/profile" component={ProfilePage} exact />
    </div>
  );
}

export default App;
