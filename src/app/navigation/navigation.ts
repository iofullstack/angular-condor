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
                type     : 'collapsable',
                children: [
                  {
                    id       : 'u0',
                    title    : 'Listar',
                    type     : 'item',
                    icon     : 'user',
                    url      : '/usuarios/listar'
                  },
                  {
                    id       : 'u1',
                    title    : 'Registrar',
                    type     : 'item',
                    icon     : 'user',
                    url      : '/usuarios/registrar'
                  }
                ]
            }
        ]
    }
];
