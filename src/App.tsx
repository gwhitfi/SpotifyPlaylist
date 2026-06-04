import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Help } from "./pages/Help";
import { About } from "./pages/About";
import { Callback } from "./pages/Callback";
import { NotFound } from "./pages/NotFound";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
