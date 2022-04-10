import Node from "./Node";

let id_count = 1;

export default class Three {
    id;
    height = -1;
    nodeList = [];

    constructor() {
        this.id = id_count;
        id_count++;
    }

    // Getters
    getNodeById(id) {
        let result = null;
        this.nodeList.forEach(node => {
            if (id === node.id) {
                result = node;
                return;
            }
        })
        return result;
    }

    getNodeByHeight(height) {
        let result = [];
        this.nodeList.forEach(node => {
            if (height === node.height) {
                result.push(node);
            }
        })
        return result;
    }

    getNodeByHeightAndLetter(height, letter) {
        let list = [];
        let result = null;

        if (height === 0) {
            result = this.getNodeById(1);
        } else {
            this.nodeList[0].childs.forEach(child => {
                if (height === child.height) {
                    list.push(child);
                }
            })
            list.forEach(node => {
                if (node.letter === letter) {
                    result = node;
                }
            })
        }
        return result;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setId_count(new_id_count) {
        id_count = new_id_count;
    }

    setHeight(height) {
        this.height = height;
    }

    setNodeList(nodeList) {
        this.nodeList = nodeList;
    }

    // Functions

    addWord(word, parent) {
        if (word.length === 0) { // word is empty
            parent.setLastLetterWord(true);
            return;
        }

        let letter = word[0];
        let nodeToAdd = null;

        if (parent.childs.length === 0) {
            nodeToAdd = new Node(this, letter, parent.height + 1, parent);
        } else {
            if (parent.getLastChild().letter !== letter) {
                nodeToAdd = new Node(this, letter, parent.height + 1, parent);
            } else {
                nodeToAdd = parent.getLastChild();
            }
        }
        parent.childs.forEach(node => {
            if (node.letter < letter) {
                node.setLastChild(false);
            }
        })
        word = word.substring(1, word.length);
        this.addWord(word, nodeToAdd);
    }

    verifyWordExistence(word) {
        word = word.toUpperCase();
        let parent = this.getNodeByHeightAndLetter(1, word[0]);
        let result = "" + parent.letter;
        for (let i = 1; i < word.length; i++) {
            parent.childs.forEach(node => {
                if (word[i] === node.letter) {
                    result = result + word[i];
                    parent = node;
                }
            })
        }
        if (result === word && result.length > 1) {
            return true;
        } else {
            return false;
        }
    }

    findLongestWord(word, parent, result, count) {
        let temp_child;
        let wordToAdd = "";
        let letter;
        if (word.length !== 0) {
            for (let i = 0; i < word.length; i++) {
                letter = word[i].toUpperCase();
                if (parent.childs.length !== 0) {
                    parent.childs.forEach(child => {
                        if (child.letter === letter) {
                            if (child.lastLetterWord === true) {
                                temp_child = child;
                                while (temp_child !== this.getNodeById(1)) {
                                    wordToAdd = temp_child.letter + wordToAdd;
                                    temp_child = temp_child.parent;
                                }
                                result.push(wordToAdd);
                                wordToAdd = "";
                            }
                            word = word.slice(1, i) + word.slice(i+1);
                            result = this.findLongestWord(word, child, result, count);
                        } else {
                            if (child.getLastChild === true) {
                                if (i === word.length - 1) {
                                    wordToAdd = "";
                                }
                            }
                        }
                    })
                } else {
                    result = this.findLongestWord(word, parent.parent, result, count);
                }
            }
        } else {
            return [];
        }
        return result;
    }
}