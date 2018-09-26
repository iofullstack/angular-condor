import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Administración',
        type     : 'group',
        children : [
            {
                id       : 'usuarios',
                title    : 'Usuarios',
                type     : 'item',
                icon     : 'user',
                url      : '/usuarios',
                badge    : {
                    title    : '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
