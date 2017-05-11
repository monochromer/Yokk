var initialState = [
  {
    _id: 'a1',
    text: 'a1',
    new: false,
    link: '/teams',
    date: Date.now()
  },
  {
    _id: 'a2',
    text: 'a2',
    new: false,
    link: '',
    date: Date.now()
  },
  {
    _id: 'a3',
    text: 'a3',
    new: false,
    link: '',
    date: Date.now()
  },
  {
    _id: 'a4',
    text: 'a4loooooooooong teeeeeext textexte text',
    new: false,
    link: '',
    date: Date.now()
  },
  {
    _id: 'a5',
    text: 'a5',
    new: true,
    link: '',
    date: Date.now()
  },
  {
    _id: 'a6',
    text: 'a6',
    new: true,
    link: '',
    date: Date.now()
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_NOTIFICATIONS":
      return action.payload;

    default:
      return state;
  }
}
