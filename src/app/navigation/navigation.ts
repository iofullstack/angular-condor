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
            },
            {
              id       : 'clientes',
              title    : 'Clientes',
              type     : 'collapsable',
              children: [
                {
                  id       : 'c0',
                  title    : 'Listar',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/clientes/listar'
                },
                {
                  id       : 'c1',
                  title    : 'Registrar',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/clientes/registrar'
                }
              ]
            },
            {
              id       : 'mesas',
              title    : 'Tomar Pedido',
              type     : 'collapsable',
              children: [
                {
                  id       : 'c0',
                  title    : 'Mesas',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/orden/mesas'
                },
                {
                  id       : 'c0',
                  title    : 'Preparar Orden',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/orden/preparar'
                }
              ]
            },
            {
              id       : 'pedido',
              title    : 'Pedido',
              type     : 'collapsable',
              children: [
                {
                  id       : 'p0',
                  title    : 'Cajero',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/cajero'
                },
                {
                  id       : 'p1',
                  title    : 'Mesero',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/mesero'
                },
                {
                  id       : 'p2',
                  title    : 'Cocina',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/cocina'
                }
              ]
            }
        ]
    }
];
