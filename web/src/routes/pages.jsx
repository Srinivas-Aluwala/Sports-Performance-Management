import { lazy } from "react";
import { roleIds } from "../util/roles.js";

//Auth containers
const LoginContainer = lazy(() => import('../screens/login/LoginContainer.jsx'));
const LogoutContainer = lazy(() => import('../screens/login/LogoutContainer.jsx'));
const SignupContainer = lazy(() => import('../screens/login/SignupContainer.jsx'));
const RootLayout = lazy(() => import('../screens/RootLayout.jsx'));

//Parent containers
const HomePageContainer = lazy(() => import('../screens/home/HomePageContainer.jsx'));
const AdminDashboardContainer = lazy(() => import('../screens/admin/AdminDashboardContainer.jsx'));
const AthleteDashboardContainer = lazy(() => import('../screens/athlete/AthleteDashboardContainer.jsx'));
const CoacheDashboardContainer = lazy(() => import('../screens/coache/CoacheDashboardContainer.jsx'));
const NewsContainer = lazy(() => import('../screens/news/NewsContainer.jsx'));
const EventsContainer = lazy(() => import('../screens/events/EventsContainer.jsx'));
const ResultsContainer = lazy(() => import('../screens/results/ResultsContainer.jsx'));
const CoachesContainer = lazy(() => import('../screens/coache/CoachesContainer.jsx'));
const AthletesContainer = lazy(() => import('../screens/athlete/AthletesContainer.jsx'));

//Child containers
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard.jsx'));
const ManageResults = lazy(() => import('../components/admin/manage/ManageResults.jsx'));
const ManageAthletes = lazy(() => import('../components/admin/manage/ManageAthletes.jsx'));
const CoacheDashboard = lazy(() => import('../components/coache/CoacheDashboard.jsx'));
const AthleteDashboard = lazy(() => import('../components/athlete/AthleteDashboard.jsx'));
const CreateEvent = lazy(() => import('../components/admin/manage/CreateEvent.jsx'));
const CreateMeet = lazy(() => import('../components/admin/manage/CreateMeet.jsx'));
const AthleteProfile = lazy(() => import('../components/athlete/AthleteProfile.jsx'));
const AthletesHome = lazy(() => import('../components/athlete/AthletesHome.jsx'));
const CoacheProfile = lazy(() => import('../components/coache/CoacheProfile.jsx'));

export const pages = {
        root: {
                path: "/",
                element: <RootLayout />,
                children: {

                        home: {
                                path: "/athlethics",
                                element: <HomePageContainer />,
                        },
                        login: {
                                path: "/login",
                                element: <LoginContainer />,
                        },
                        logout: {
                                path: "/logout",
                                element: <LogoutContainer />,
                        },
                        signup: {
                                path: "/signup",
                                element: <SignupContainer />,
                        },
                        news: {
                                path: "/news",
                                element: <NewsContainer />,
                        },
                        events: {
                                path: "/events",
                                element: <EventsContainer />,
                        },
                        results: {
                                path: "/results",
                                element: <ResultsContainer />,
                        },
                        coaches: {
                                path: "/coaches",
                                element: <CoachesContainer />,
                                children: {
                                        // home: {
                                        //         path: '',
                                        //         element: <CoachesHome />
                                        // },
                                        profile: {
                                                path: 'profile',
                                                element: <CoacheProfile />
                                        }
                                }

                        },
                        athletes: {
                                path: "/athletes",
                                element: <AthletesContainer />,
                                children: {

                                        home: {
                                                path: 'home',
                                                element: <AthletesHome />
                                        },
                                        profile: {
                                                path: '/athletes/profile',
                                                element: <AthleteProfile />
                                        }

                                }
                        },
                        admin: {
                                path: "/admin",
                                element: <AdminDashboardContainer />,
                                children: {
                                        dashboard: {
                                                path: "dashboard",
                                                element: <AdminDashboard />,
                                                children: {

                                                },
                                                private: true,
                                                roleId: roleIds.ADMIN

                                        },
                                        createEvent: {
                                                path: 'manage/createEvent',
                                                element: <CreateEvent />,
                                                private: true,
                                                roleId: roleIds.ADMIN

                                        },

                                        createMeet: {
                                                path: 'manage/createMeet',
                                                element: <CreateMeet />,
                                                private: true,
                                                roleId: roleIds.ADMIN

                                        },

                                        manage_Athletes: {
                                                path: "manage/Athletes",
                                                element: <ManageAthletes />,
                                                private: true,
                                                roleId: roleIds.ADMIN

                                        },

                                        manage_Results: {
                                                path: "manage/Results",
                                                element: <ManageResults />,
                                                private: true,
                                                roleId: roleIds.ADMIN
                                        },
                                },
                                private: true,
                                roleId: roleIds.ADMIN
                        },
                        coache: {
                                path: "/coache",
                                element: <CoacheDashboardContainer />,
                                children: {
                                        dashboard: {
                                                path: "dashboard",
                                                element: <CoacheDashboard />,
                                                private: true,
                                                roleId: roleIds.COACHE

                                        },
                                },
                                private: true,
                                roleId: roleIds.COACHE
                        },
                        athlete: {
                                path: "/athlete",
                                element: <AthleteDashboardContainer />,
                                children: {
                                        dashboard: {
                                                path: "dashboard",
                                                element: <AthleteDashboard />,
                                                private: true,
                                                roleId: roleIds.ATHLETE
                                        },
                                },
                                private: true,
                                roleId: roleIds.ATHLETE
                        },
                }
        }
};
