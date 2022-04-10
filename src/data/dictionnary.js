import Node from "../entity/Node";
import Three from "../entity/Three";
import dictionnary from "./dictionnary.json";

const three = new Three();

export function createThree() {
    three.nodeList.push(new Node(three, '', 0));
    let i = 0;
    while(dictionnary[i]) {
        three.addWord(dictionnary[i], three.getNodeById(1));
        i++;
    }
    return three;
}

export function verifyWord(word) {
    if (word.length === 0) {
        return false;
    } else {
        return three.verifyWordExistence(word);
    }
}

export function getLongestWord(letters) {
    let count = 0;
    let words = [];
    let possible_words = [];
    let maxlength = 0;
    let longest_word = "";
    possible_words = three.findLongestWord(letters, three.getNodeById(1), words, count);
    possible_words.forEach(word => {
        if (word.length > maxlength) {
            maxlength = word.length;
            longest_word = word;
        }
    })
    return longest_word;
}