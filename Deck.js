var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Deck{

    constructor(){
        this.deck = new Array();
        for(let i = 0; i < suits.length; i++){
            for(let j = 0; j < values.length; j++){
                let card = {Value: values[j], Suit: suits[i]};
                this.deck.push(card);
            }
        }
    }

    // Fischer-Yates in-place shuffle
    shuffle(){
        let i, j, tmp;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp;
        }
    }

}

exports.suits = suits;
exports.values = values;
exports.deck = Deck;