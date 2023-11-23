export const ORDER_DETAILS_DATA = [
    {
      order_id: 1,
      title: 'Order 1',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products_id: '1, 2'
    },
    {
      order_id: 2,
      title: 'Order 2',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products_id:  '3, 4'
    },
    {
      order_id: 3,
      title: 'Order 3',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products_id:  '5, 6'
    }
  ]


  export const PRODUCT_DETAILS_DATA = [
    {
      products_id: 1,
      serialNumber: 1234,
      isNew: 1,
      photo: '358825057.webp',
      title: 'Lorem ipsum dolor sit.',
      type: 'Monitors',
      specification: 'Specification 1',
        guarantee_start: '2017-06-29 12:09:33',
        guarantee_end: '2017-06-29 12:09:33',
      price: JSON.stringify([
        {value: 100, symbol: 'USD', isDefault: 0},
        {value: 2600, symbol: 'UAH', isDefault: 1}
      ]),
      order_id: 1,
      date: '2017-06-29 12:09:33'
    },
    {
      products_id: 2,
      serialNumber: 1234,
      isNew: 0,
      photo: '358825057.webp',
      title: 'Lorem ipsum dolor sit.',
      type: 'Monitors',
      specification: 'Specification 2',
        guarantee_start: '2017-06-29 12:09:33',
        guarantee_end: '2017-06-29 12:09:33',
      price: JSON.stringify([
        {value: 100, symbol: 'USD', isDefault: 0},
        {value: 2600, symbol: 'UAH', isDefault: 1}
      ]),
      order_id: 1,
      date: '2017-06-29 12:09:33'
    },

    {
        products_id: 3,
        serialNumber: 1234,
        isNew: 1,
        photo: '358825057.webp',
        title: 'Lorem ipsum dolor sit.',
        type: 'Monitors',
        specification: 'Specification 3',
            guarantee_start: '2017-06-29 12:09:33',
            guarantee_end: '2017-06-29 12:09:33',
            price: JSON.stringify([
                {value: 100, symbol: 'USD', isDefault: 0},
                {value: 2600, symbol: 'UAH', isDefault: 1}
              ]),
        order_id: 2,
        date: '2017-06-29 12:09:33'
      },
      {
        products_id: 4,
        serialNumber: 1234,
        isNew: 0,
        photo: '358825057.webp',
        title: 'Lorem ipsum dolor.',
        type: 'Monitors',
        specification: 'Specification 2',
        guarantee_start: '2017-06-29 12:09:33',
        guarantee_end: '2017-06-29 12:09:33',
        price: JSON.stringify([
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1}
          ]),
        order_id: 2,
        date: '2017-06-29 12:09:33'
      },
      {
        products_id: 5,
        serialNumber: 1234,
        isNew: 1,
        photo: '358825057.webp',
        title: 'Lorem ipsum dolor sit.',
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee_start: '2017-06-29 12:09:33',
        guarantee_end: '2017-06-29 12:09:33',
        price: JSON.stringify([
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1}
          ]),
        order_id: 3,
        date: '2017-06-29 12:09:33'
      },
      {
        products_id: 6,
        serialNumber: 1234,
        isNew: 0,
        photo: '358825057.webp',
        title: 'Lorem ipsum dolor sit.',
        type: 'Monitors',
        specification: 'Specification 2',
        guarantee_start: '2017-06-29 12:09:33',
        guarantee_end: '2017-06-29 12:09:33',
        price: JSON.stringify([
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1}
          ]),
        order_id: 3,
        date: '2017-06-29 12:09:33'
      }
  ]
  
  

  
  
