import React from "react";

let id_count = 1;

export default class Node {
    letter;
    id;
    height;
    three;
    lastLetterWord = false;
    lastChild = true;
    childs = [];
    parent;

    constructor(three, letter, height, parent) {
        if(parent) {
            if (height === parent.height + 1) {
                this.id = id_count;
                id_count++;
                this.three = three;
                this.letter = letter;
                this.height = height;
                this.parent = parent;
                parent.childs.push(this);
                if (height > three.height) {
                    three.setHeight(height);
                }
            } else if (height !== parent.height + 1) {
                return;
            }
        } else {
            this.id = id_count;
            id_count++;
            this.three = three;
            this.letter = letter;
            this.height = height;
            if (height > three.height) {
                three.setHeight(height);
            }
        }
    }

    // Setters
    setLetter(letter) {
        this.letter = letter;
    }

    setId_count(new_id_count) {
        id_count = new_id_count;
    }

    setId(id) {
        this.id = id;
    }

    setHeight(height) {
        this.height = height;
    }

    setChilds(childs) {
        this.childs = childs;
    }

    setParent(parent) {
        this.parent = parent;
    }

    setThree(three) {
        this.three = three;
    }

    setLastLetterWord(lastLetterWord) {
        this.lastLetterWord = lastLetterWord;
    }

    setLastChild(lastChild) {
        this.lastChild = lastChild;
    }

    // Functions

    getLastChild() {
        let result = null;
        this.childs.forEach(child => {
            if (child.lastChild === true) {
                result = child;
            }
        })
        return result;
    }
}