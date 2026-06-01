import { UserTypes } from "../../../../../shared/src/lib/auth/enums/user-type.enum";
import { NavBarItem } from "../models/layout.interfaces";


export const NAVBAR_DATA: NavBarItem[] = [
    {
        name: 'Dashboard',
        link: 'dashboard',
        usertype: [UserTypes.CLIENT],
        activeClass: 'active',
        iconClass: 'icon-mask icon-md icon-chart-bar-square color-brown'
    },

    {
        name: 'Enquiries',
        link: 'enquiry/list',
        usertype: [UserTypes.CLIENT],
        activeClass: 'active',
        queryParams: { status: 'all' },
        iconClass: 'icon-mask icon-md icon-tag color-voilet-bright'
    }
];
