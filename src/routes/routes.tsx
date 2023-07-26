import configRoutes from "../config/configRouter";
import AdminEvents from "../pages/admin/admin-events/AdminEvents";
import AdminInfoEvents from "../pages/admin/admin-events/AdminInfoEvents";
import AdminHome from "../pages/admin/admin-home/AdminHome";
import AdminAddPlayer from "../pages/admin/admin-player/AdminAddPlayer";
import AdminPlayer from "../pages/admin/admin-player/AdminPlayer";
import AdminUpdatePlayer from "../pages/admin/admin-player/AdminUpdatePlayer";
import Home from "../pages/home/Home";
import LiveEvent from "../pages/live_event/LiveEvent";
import News from "../pages/news/News";
const mainRoutes = [
  {
    path: configRoutes.home,
    component: Home,
  },
  {
    path: configRoutes.news,
    component: News,
  },
  {
    path: configRoutes.liveEvent,
    component: LiveEvent,
  },
];

export const adminRoutes = [
  {
    path: configRoutes.adminHome,
    component: AdminHome,
  },
  {
    path: configRoutes.adminPlayer,
    component: AdminPlayer,
  },
  {
    path: configRoutes.adminAddPlayer,
    component: AdminAddPlayer,
  },
  {
    path: configRoutes.adminUpdatePlayer,
    component: AdminUpdatePlayer,
  },
  {
    path: configRoutes.adminEvents,
    component: AdminEvents,
  },
  {
    path: configRoutes.adminEventsDetails,
    component: AdminInfoEvents,
  },
];

export default mainRoutes;
