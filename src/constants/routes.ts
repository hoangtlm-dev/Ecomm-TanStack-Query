export const ROUTES = {
  ROOT: '/',
  PRODUCT: '/product',
  CART: '/cart',
  NOT_FOUND: '*',

  // Menus
  BAGS: '/bags',
  SNEAKERS: '/sneakers',
  BELT: '/belt',
  CONTACT: '/contact'
}

export const NAV_MENUS = [
  {
    pageName: 'Home',
    route: ROUTES.ROOT
  },
  {
    pageName: 'Bag',
    route: ROUTES.BAGS
  },
  {
    pageName: 'Sneakers',
    route: ROUTES.SNEAKERS
  },
  {
    pageName: 'Belt',
    route: ROUTES.BELT
  },
  {
    pageName: 'Contact',
    route: ROUTES.CONTACT
  }
]
