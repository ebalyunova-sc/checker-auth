class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.checkers = [];
    }

    getColor() {
        return this.color;
    }

    getCheckers() {
        return this.checkers;
    }

    addCheckerToPlayer(x, y) {
        let checker = {
            x: x,
            y: y,
            color: this.color,
            // men - обычная шашка, lady - дамка
            type: 'men',
        }
        this.checkers.push(checker);
    }

    searchCheckerByCoordinates(x, y) {
        for (let i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i] !== null
                && this.checkers[i].x === x && this.checkers[i].y === y)
            {
                return this.checkers[i];
            }
        }
        return null;
    }

    changeCheckersCoordinates(x1, y1, x2, y2) {
        if (this.searchCheckerByCoordinates(x1, y1) !== null)
        {
            for (let i = 0; i < this.checkers.length; i++) {
                if (this.checkers[i] !== null
                    && this.checkers[i].x === x1 && this.checkers[i].y === y1)
                {
                    this.checkers[i].x = x2;
                    this.checkers[i].y = y2;
                }
            }
        }
    }

    getCheckersType(x, y) {
        if (this.searchCheckerByCoordinates(x, y) !== null)
        {
            return this.searchCheckerByCoordinates(x, y).type;
        }
    }

    changeCheckersType(x, y) {
        if (this.searchCheckerByCoordinates(x, y) !== null)
        {
            this.searchCheckerByCoordinates(x, y).type = 'lady';
        }
    }

    deleteChecker(x, y) {
        for (let i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i] !== null
                && this.checkers[i].x === x && this.checkers[i].y === y)
            {
                this.checkers[i] = null;
            }
        }
    }
}

module.exports = Player;