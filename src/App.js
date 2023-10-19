import React, { useEffect, useState } from "react";
import { /* BrowserRouter,*/ Routes, Route, useLocation } from "react-router-dom";

import "./App.scss";
import PageLayout from "./layouts/PageLayout";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import About from "./pages/About/About";

export default function App() {
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("route_fade_in");

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("route_fade_out");
    }, [location, displayLocation]);

    return (
        <div
            className={transitionStage}
            onAnimationEnd={() => {
                if (transitionStage === "route_fade_out") {
                    setTransitionStage("route_fade_in");
                    setDisplayLocation(location);
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route path="/brunomiguel" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </div>
    );
}

// TODO:
//  - change colors in light mode a good amount to be more readable (and also maybe in dark mode, the intermediate color could be better)
//  - Deploy
//  - Check if github pages refresh bug is good
//  - if images take time to load on production, try to compact all pictures (tinyPNG) and, as last resort, add loading to whole page until all images are loaded and only then allow showing of page to user (unlikely)
