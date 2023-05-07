import React from "react";
import { Route } from "react-router-dom";
import CoreTeam from "Feature/CoreTeam";
import Introduction from "Feature/Introduction";
import ForgotPasswordPage from "Screens/Auth/ForgotPassword";
import Login from "Screens/Auth/Login";
import Register from "Screens/Auth/Register";
import ArabicLexsitusTeam from "Screens/Landing/ArabicLexsitusTeam";
import CliccAuthors from "Screens/Landing/CliccAuthors";
import Copyright from "Screens/Landing/Copyright";
import DigestEditors from "Screens/Landing/DigestEditors";
import FrenchLexsitusTeam from "Screens/Landing/FrenchLexsitusTeam";
import LandingSlider from "Screens/Landing/LandingSlider";
import LexsitusFaculty from "Screens/Landing/Lexsitus Faculty";
import PersianLexsitusTeam from "Screens/Landing/PersianLexsitusTeam";
import Privacy from "Screens/Landing/Privacy";

const LandingNavigation: React.FC = () => (
    <Route element={<>Landing</>}>
        <Route index element={<LandingSlider />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="coordination" element={<CoreTeam />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="copyright" element={<Copyright />} />
        <Route path="privacy" element={<Privacy />} />
        <Route
            path="forgot-password"
            element={<ForgotPasswordPage />}
        />
        <Route path="faculty" element={<LexsitusFaculty />} />
        <Route path="authors" element={<CliccAuthors />} />
        <Route path="digest-editors" element={<DigestEditors />} />
        <Route
            path="arabic-team"
            element={<ArabicLexsitusTeam />}
        />
        <Route
            path="french-team"
            element={<FrenchLexsitusTeam />}
        />
        <Route
            path="persian-team"
            element={<PersianLexsitusTeam />}
        />
        <Route path="menulist" element={<>menulist</>} />
    </Route>
);

export default LandingNavigation;