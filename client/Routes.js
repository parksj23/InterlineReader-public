import loadable from "loadable-components";

export const Index = loadable(() => import("./components/Index"));
export const Home = loadable(() => import("./components/Home"));
export const PageNotFound = loadable(() => import("./components/PageNotFound"));
export const About = loadable(() => import("./components/About"));
export const Signup = loadable(() => import("./components/Signup"));
export const Login = loadable(() => import("./components/Login"));

