import React, { Suspense, lazy, type FC, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppNavigation from "AppNavigation";
import Spinner from "Components/Spinner";
import FormFields from "Feature/ReactFormField/FormFields";
import { useCurrentLanguage } from "Hooks/useTranslation";
import useBoot from "boot";


const CoreTeam = lazy(async () => import("Feature/CoreTeam"));
const Introduction = lazy(async () => import("Feature/Introduction"));
const FrenchLexsitusTeam = lazy(async () => import("Screens/Landing/FrenchLexsitusTeam"));
const Tutorials = lazy(async () => import("Screens/Tutorials"));
const LexsitusFaculty = lazy(async () => import("Screens/Landing/Lexsitus Faculty"));
const PersianLexsitusTeam = lazy(async () => import("Screens/Landing/PersianLexsitusTeam"));
const ArabicLexsitusTeam = lazy(async () => import("Screens/Landing/ArabicLexsitusTeam"));
const Copyright = lazy(async () => import("Screens/Landing/Copyright"));
const CliccAuthors = lazy(async () => import("Screens/Landing/CliccAuthors"));
const Privacy = lazy(async () => import("Screens/Landing/Privacy"));
const Register = lazy(async () => import("Screens/Auth/Register"));
const Login = lazy(async () => import("Screens/Auth/Login"));
const ForgotPasswordPage = lazy(async () => import("Screens/Auth/ForgotPassword"));
const LandingSlider = lazy(async () => import("Screens/Landing/LandingSlider"));
const DigestEditors = lazy(async () => import("Screens/Landing/DigestEditors"));
const Landing = lazy(async () => import("Screens/Landing/Home"));
const ReadingLists = lazy(async () => import("Screens/ReadingLists"));
const Library = lazy(async () => import("Screens/Library"));
const Toaep = lazy(async () => import("Screens/Toaep"));
const AdminUsersList = lazy(async () => import("Screens/AdminUsersList"));


// eslint-disable-next-line new-cap
FormFields();


export interface LandingRoutesConfigurationTypes {
    path: string;
    isIndex?: boolean;
    element: ReactNode;

}

export const LandingRoutesConfiguration: LandingRoutesConfigurationTypes[] = [
    {
        path: "",
        element: <LandingSlider />,
        isIndex: true,
    },
    {
        path: "introduction",
        element: <Introduction />,
    },
    {
        path: "coordination",
        element: <CoreTeam />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "copyright",
        element: <Copyright />,
    },
    {
        path: "privacy",
        element: <Privacy />,
    },
    {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "faculty",
        element: <LexsitusFaculty />,
    },
    {
        path: "authors",
        element: <CliccAuthors />,
    },
    {
        path: "digest-editors",
        element: <DigestEditors />,
    },
    {
        path: "arabic-team",
        element: <ArabicLexsitusTeam />,
    },
    {
        path: "french-team",
        element: <FrenchLexsitusTeam />,
    },
    {
        path: "persian-team",
        element: <PersianLexsitusTeam />,
    },
    {
        path: "menulist",
        element: <></>
    }
];

const RootLayout: FC = () => {
    useBoot();
    const { language } = useCurrentLanguage();
    return (
        <Routes>

            <Route path="/list" element={<Suspense fallback={<Spinner />}><AdminUsersList /></Suspense>} />

            <Route element={<Suspense fallback={<Spinner />}><ReadingLists /></Suspense>}>
                <Route path="reading-lists/:slug?" element={<></>} />
            </Route>
            {
                // App routes
            }
            <Route path=":translation" element={<AppNavigation />}>
                {
                    // Library routes
                }

                <Route element={<Suspense fallback={<Spinner />}><Library /></Suspense>}>
                    <Route
                        path=":tab/:menuSlug?/:contentSlug?"
                        element={<></>}
                    />
                </Route>

                {
                    // Toaep routes
                }
                <Route element={<Suspense fallback={<Spinner />}><Toaep /></Suspense>}>
                    <Route
                        path="toaep/:slug?"
                        element={<>Toaep</>}
                    />
                </Route>
                
                {
                    // Global routes
                }

                <Route path="help" element={
                    <Suspense fallback={<Spinner />}><Tutorials /></Suspense>
                } />

                {
                    // Landing page routes
                }

                <Route element={<Suspense fallback={<Spinner />}><Landing /></Suspense>}>
                    {
                        LandingRoutesConfiguration.map((landingRoutes, idx) => <Route key={idx} index={landingRoutes.isIndex} path={landingRoutes.path} element={<Suspense fallback={<Spinner />}>{landingRoutes.element}</Suspense>} />)
                    }

                </Route>

            </Route>

            {
                // Fallback
            }
            <Route path="*" element={<Navigate to={language} />} />
        </Routes>
    );
};

export default RootLayout;