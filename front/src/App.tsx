import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/header/Header";
import Main from "./Components/main/Main";
import Post from "./Components/post/Post";
import List from "./Components/boardList/List";
import Login from "./Components/login/Login";
import Regist from "./Components/Regist/Regist";
import Complete from "./Components/Regist/Complete";
function App() {
  return (
    <div className="App w-sm h-[550px]">
      <Header></Header>
      <Routes>
        <Route path="/" Component={Main}></Route>
        <Route path="/post/:postID" element={<Post />} />
        <Route path="/list/:listID" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/regist/done" element={<Complete />} />
      </Routes>
    </div>
  );
}

export default App;
