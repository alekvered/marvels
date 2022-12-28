const checkImage = (src) => {
  if (
    src ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    return 'contain';
  } else {
    return 'cover';
  }
};

export default checkImage;
