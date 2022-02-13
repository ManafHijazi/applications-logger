import loadable from '@loadable/component';

const CoursesSchedules = loadable(() => import('../../../Views/Home/applications-logger/ApplicationsLogger.View'));

export const HomeRoutes = [
  {
    id: 1,
    path: '/applications-logger',
    name: 'Shared:self-service',
    component: CoursesSchedules,
    layout: '/home',
    default: true,
    isExact: true,
    isRoute: true,
    authorize: true,
    roles: [],
    icon: 'mdi mdi-notebook-check-outline',
    isDisabled: false,
    children: [],
  },
];
