import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { DrawCanva } from "./components/drawing_components/DrawCanva";
import { Menu } from "./components/menu/Menu";

export const MainRouter: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Menu />} />
                <Route path="/draw" element={<DrawCanva />} />
                <Route path="/draw/:id" element={<DrawCanva />} />
            </Route>
        </Routes>
    </Router>
}