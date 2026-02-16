import { UserTypes } from "../../../../../shared/src/lib/auth/enums/user-type.enum";
import { NavBarItem } from "../models/layout.interfaces";


export const NAVBAR_DATA: NavBarItem[] = [
    {
        name: 'Dashboard',
        link: 'dashboard',
        usertype: [UserTypes.ADMIN],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-chart-bar-square color-brown'
    },
    {
        name: 'Categories',
        link: 'master/categories',
        usertype: [UserTypes.ADMIN],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-tag color-voilet-bright'
    },
    {
        name: 'Clients',
        link: 'clients/list',
        queryParams: { status: 'all' },  
        usertype: [UserTypes.ADMIN],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-user-group color-turquoise'
    },
    {
        name: 'Workers',
        link: 'workers/list',
        queryParams: { status: 'all' },  
        usertype: [UserTypes.ADMIN],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-users color-mulbery'
    },
    {
        name: 'Approvals',
        link: 'request/approvals',
        usertype: [UserTypes.ADMIN],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-check-circle color-green-forest'
    },
    {
        name: 'Job Requests',
        link: 'request/job-requests',
        usertype: [
            UserTypes.ADMIN
        ],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-document-chart-bar color-orange-dark'
    },

];
