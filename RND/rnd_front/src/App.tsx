import "./App.css";
import List from "./Board/List";
import Login from "./login/Login";
import Regist from "./Regist/Regist";

function App() {
  return (
    <div>
      <Login />
      <Regist />
      <List />
    </div>
  );
}

export default App;
