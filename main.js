// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new memoryGame();
});

class memoryGame {
    constructor() {
        this.cards = document.querySelectorAll('.image-grid div'); //gets all cards-hidden and front
        this.flippedCards = [];//array to track flipped cards
        this.matchedCards = 0;//looks for matched pairs
        this.isLocked = false;//prevents cards from flipping during animation
        this.moves = 0; //counts num of moves
        
        this.init();
    }

    init() {//initialization method to set up game
        // creates moves display
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score';
        scoreDiv.innerHTML = 'Moves: <span id="moves">0</span>';
        document.querySelector('p').after(scoreDiv);

        // Add event listeners for card to flip on click
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
    }

    flipCard(card) {
        if (this.isLocked) return;//card cant flip while locked
        if (card.classList.contains('flipped')) return;//card that are flipped, stay flipped
        if (this.flippedCards.includes(card)) return;//card cant be flipped twice

        card.classList.add('flipped');//animation runs on flip
        this.flippedCards.push(card);//updates fliped cards array

        if (this.flippedCards.length === 2) { //if 2 cards are flipped, check for a match
            this.moves++;
            document.getElementById('moves').textContent = this.moves; //updates move counter for each card flipped
            this.checkMatch();//calls on function below to see if cards rae a match
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;//selects two flipped cards in arrray
        const img1 = card1.querySelector('.hidden').src;//gets card img src
        const img2 = card2.querySelector('.hidden').src;

        if (img1 === img2) {
            this.handleMatch();//if match,use handleMatch function
        } else {
            this.handleMismatch();//if not, use handleMismatch function
        }
    }

    handleMatch() {
        this.flippedCards.forEach(card => {
            card.classList.add('matched');
            card.style.pointerEvents = 'none';//matched cards cant be clicked on
        });
        this.matchedCards++;//counst how many pairs of cards are matched
        this.flippedCards = []; //reset array for flipped cards

        if (this.matchedCards === 10) { //check if game is over 20 cards = 10 matched pairs
            setTimeout(() => {
                alert(`Congratulations! You matched all cards in ${this.moves} moves!`);
                this.resetGame();//rests game after 5 seconds of win display message
            }, 500);
        }
    }

    handleMismatch() {
        this.isLocked = true;
        setTimeout(() => {
            this.flippedCards.forEach(card => card.classList.remove('flipped'));//flips both cards in array back
            this.flippedCards = [];//rests array
            this.isLocked = false;
        }, 1000);
    }

    resetGame() {
        // reload the page to reset the game
        window.location.reload();
    }
}