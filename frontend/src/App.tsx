import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
};

export default App;