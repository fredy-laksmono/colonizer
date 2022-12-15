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

const socket = io.connect("http://localhost:3001");

function App() {
  const [authenticated, toggleAuthenticated] = useState(false);
  const [inGame, toggleInGame] = useState(false);
  const [user, setUser] = useState(null);
  const [userRaces, setUserRaces] = useState([]);

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null);
    toggleAuthenticated(false);
    localStorage.clear();
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
            element={<Welcome authenticated={authenticated} user={user} />}
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
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/unique" element={<UniqueManagement />} />
          <Route
            path="/races"
            element={
              <RaceManagement
                user={user}
                userRaces={userRaces}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="/races/new"
            element={<RaceDetail user={user} authenticated={authenticated} />}
          />
          <Route
            path="/chat"
            element={<ChatWindow user={user} authenticated={authenticated} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
