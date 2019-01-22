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
              id       : 'menu',
              title    : 'Menu',
              type     : 'collapsable',
              children: [
                {
                  id       : 'c0',
                  title    : 'Agregar Categoría',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/menu/categoria'
                },
                {
                  id       : 'c1',
                  title    : 'Agregar menú',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/menu/registrar'
                },
                // {
                //   id       : 'c2',
                //   title    : 'Agregar precios',
                //   type     : 'item',
                //   icon     : 'user',
                //   url      : '/menu/precios'
                // },
                // {
                //   id       : 'c3',
                //   title    : 'Listar menú',
                //   type     : 'item',
                //   icon     : 'user',
                //   url      : '/menu/listar'
                // }
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
                  title    : 'Listar',
                  type     : 'item',
                  icon     : 'user',
                  url      : '/orden/listar'
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
              id       : 'detalle',
              title    : 'Detalle',
              type     : 'collapsable',
              children: [
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
