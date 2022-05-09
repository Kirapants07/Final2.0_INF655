import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';
import { TaskProvider } from "./components/context/TaskContext";
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import ForgotPassword from './components/pages/ForgotPassword';
import Favorites from './components/pages/Favorites';



function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot=password" element={<ForgotPassword />} />
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;