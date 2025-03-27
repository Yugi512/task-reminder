import { type RouteConfig, index , layout, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("profile","routes/profile.tsx"),
    layout("routes/authpage.tsx",[
        route("sign-up","routes/sign-up.tsx"),
        route("sign-in","routes/sign-in.tsx"),
    ])
] satisfies RouteConfig;