import "./styles/App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import io from "socket.io-client";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import UniqueManagement from "./pages/UniqueManagement";
import RaceDetail from "./pages/RaceDetail";
import RaceManagement from "./pages/RaceManagement";
import { CheckSession } from "./services/Auth";
import { GetUserRaces } from "./services/RaceServices";
import ChatWindow from "./components/ChatWindow";
import { useNavigate } from "react-router-dom";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect();

function App() {
  const [authenticated, toggleAuthenticated] = useState(false);
  const [inGame, toggleInGame] = useState(false);
  const [user, setUser] = useState(null);
  const [userRaces, setUserRaces] = useState([]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null);
    toggleAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
    toggleAuthenticated(true);
  };

  const getUserRaces = async (userId) => {
    let payload = await GetUserRaces(userId);
    setUserRaces(payload);
  };

  // load data if user have a valid session
  useEffect(() => {
    if (user) {
      console.log("Getting user races");
      getUserRaces(user.id);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    }
  }, []);

  return (
    <div className="App">
      {inGame ? (
        <div></div>
      ) : (
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                authenticated={authenticated}
                user={user}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                socket={socket}
                authenticated={authenticated}
                user={user}
                inGame={inGame}
                toggleInGame={toggleInGame}
                userRaces={userRaces}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/unique"
            element={<UniqueManagement logEnabled={true} />}
          />
          <Route
            path="/races"
            element={
              <RaceManagement
                user={user}
                userRaces={userRaces}
                authenticated={authenticated}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/races/new"
            element={
              <RaceDetail
                user={user}
                authenticated={authenticated}
                logEnabled={true}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <ChatWindow
                user={user}
                authenticated={authenticated}
                logEnabled={true}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
