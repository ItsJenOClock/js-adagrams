import {
  numOfLetterTiles,
  bonusPoints, 
  letterPool,
  scoreChart
} from './constants';

export const drawLetters = () => {
  const lettersAvailable = [];
  for (const letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      lettersAvailable.push(letter);
    }
  }
  
  const lettersDrawn = [];
  for (let i = 0; i < numOfLetterTiles; i++) {
    const randomNumber = Math.floor(Math.random() * lettersAvailable.length);
    lettersDrawn.push(lettersAvailable[randomNumber]);
    lettersAvailable.splice(randomNumber, 1);
  }
  return lettersDrawn;
};

export const usesAvailableLetters = (input, lettersInHand) => {  
  const letterBank = {};
  for (const letter of lettersInHand) {
    if (!letterBank[letter]) {
      letterBank[letter] = 1;
    } else {
      letterBank[letter]++;
    }
  }
  
  for (const letter of input.toUpperCase()) {
    if (!letterBank[letter]) {
      return false;
    } else {
      letterBank[letter]--;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  for (const letter of word.toUpperCase()) {
    score += scoreChart[letter];
  }
  
  if (word.length >= 7 && word.length <= 10) {
    score += bonusPoints;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestWord = '';
  
  for (const word of words) {
    let score = scoreWord(word);
    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    } else if (score === highestScore) {
      if (highestWord.length !== 10 && (word.length < highestWord.length || word.length === 10)) {
        highestWord = word;
      }
    }
  }
  
  return {
    'word': highestWord, 
    'score': highestScore
  };
};