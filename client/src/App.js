import "./styles/App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [authenticated, toggleAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
