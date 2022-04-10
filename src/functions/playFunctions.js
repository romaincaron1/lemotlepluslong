// :Joueur1&Joueur2 -> ['Joueur1', 'Joueur2']
const nameSplitter = (names) => {
  names = names.split("&");
  return names;
};
const pickRandomStarter = (firstPlayer, secondPlayer) => {
  const randomNumber = Math.floor(Math.random() * (3 - 1) + 1);
  if (randomNumber === 1) {
    return firstPlayer;
  } else if (randomNumber === 2) {
    return secondPlayer;
  }
};

export { nameSplitter, pickRandomStarter }
