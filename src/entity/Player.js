import React from "react";

export default class Player {
    constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
      this.tokens = 0;
      this.case = 0;
    }
  
    getSymbolHref() {
      if (this.symbol === "star") {
        return <i class="bx bx-star"></i>;
      } else if (this.symbol === "square") {
        return <i class="bx bx-square"></i>;
      }
    }
  
    addToken() {
      this.tokens++;
    }
} 