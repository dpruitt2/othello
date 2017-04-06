import React, {Component} from 'react';
import './App.css'

export class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cellValue: this.renderPiece,
            turnCount: 0,
            cells: [],
            gameStatus: "New",
            occupiedCells: {},
            direction: [],
            piecesToBeFlipped: []
        }
        this.addPiece = this.addPiece.bind(this);
        this.renderPiece = this.renderPiece.bind(this);
        this.generateBoardSpaces = this.generateBoardSpaces.bind(this);
        this.findNeighborsDirection = this.findNeighborsDirection.bind(this);
        this.traverseBoard = this.traverseBoard.bind(this);
        this.checkLegalMoves = this.checkLegalMoves.bind(this);
        this.checkSpaces = this.checkSpaces.bind(this);
        this.checkOutsideRight = this.checkOutsideRight.bind(this);
        this.checkOutsideLeft = this.checkOutsideLeft.bind(this);
        this.checkOutsideBottom = this.checkOutsideBottom.bind(this);
        this.checkOutsideTop = this.checkOutsideTop.bind(this);
        this.checkTopLeft = this.checkTopLeft.bind(this);
        this.checkTopRight = this.checkTopRight.bind(this);
        this.checkBottomRight = this.checkBottomRight.bind(this);
        this.checkBottomLeft = this.checkBottomLeft.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.flipPiece = this.flipPiece.bind(this);

    }

    flipPiece() {
        // if(this.state.cells[id].value === "Black"){
        //     this.state.cells[id].value = "White"
        // } else if(this.state.cells[id].value === "White"){
        //     this.state.cells[id].value = "Black"
        // }
        // this.setState({cells: this.state.cells})

        const currentTurn = this.state.turnCount % 2 ===0 ? "Black" : "White"

        const cellHolder = this.state.cells.map((cell) => {
            this.state.piecesToBeFlipped.map((piece) => {
                if (cell.id === piece.id) {
                    cell.value = currentTurn
                }
            })
        })
        this.setState({cells: cellHolder, piecesToBeFlipped: []})
    }

    addPiece(piece) {
        const pieceLookup = {
            "Black": "Black",
            "White": "White",
            "Empty": "Empty"
                    }
        return pieceLookup[piece]
    }

    generateBoardSpaces(){
        if(this.state.gameStatus === "New"){
            let spaces = []
            for(var i = 0; i < 64; i++){
                spaces.push({'id' : i, 'value' : "Empty", 'occupied' : false})
                if (spaces[i].id === 28 || spaces[i].id === 35){
                    spaces[i].value = "White"
                    spaces[i].occupied = true
                    this.state.occupiedCells[spaces[i].id] = spaces[i].value;
                } else if (spaces[i].id === 27 || spaces[i].id === 36){
                    spaces[i].value = "Black"
                    spaces[i].occupied = true
                    this.state.occupiedCells[spaces[i].id] = spaces[i].value;
                }
            } while(this.state.cells.length < 64){
                spaces.map((id) => {
                    return this.state.cells.push(id)
                })
            }
        } else if(this.game.status === "InProgress"){

        }

    }

    checkSpaces(id) {
        // returns value of piece
        // console.log(parseInt(id))
        return this.state.cells[id].value
    }


    checkDirection(direction, originId) {
        if(direction === 'up') {this.findNeighborsDirection(parseInt(originId) - 8)}
        if(direction === 'down') {this.findNeighborsDirection(parseInt(originId) + 8)}
        if(direction === 'right') {this.findNeighborsDirection(parseInt(originId) + 1)}
        if(direction === 'left') {this.findNeighborsDirection(parseInt(originId) - 1)}
        if(direction === 'downLeft') {this.findNeighborsDirection(parseInt(originId) + 9)}
        if(direction === 'upLeft') {this.findNeighborsDirection(parseInt(originId) - 9)}
        if(direction === 'downRight') {this.findNeighborsDirection(parseInt(originId) + 7)}
        if(direction === 'upRight') {this.findNeighborsDirection(parseInt(originId) - 7)}
    }

    checkOutsideRight(id){
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left),
            upLeft = parseInt(id) - 9,
            upLeftValue = this.checkSpaces(upLeft),
            downLeft = parseInt(id) + 7,
            downLeftValue = this.checkSpaces(downLeft);

        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'upLeft',
                id: upLeft,
                value: upLeftValue
            },
            {
                direction: 'downLeft',
                id: downLeft,
                value: downLeftValue
            }
        ]
    }

    checkOutsideLeft(id){
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            upRight = parseInt(id) - 7,
            upRightValue = this.checkSpaces(upRight),
            downRight = parseInt(id) + 9,
            downRightValue = this.checkSpaces(downRight);

        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'upRight',
                id: upRight,
                value: upRightValue
            },
            {
                direction: 'downRight',
                id: downRight,
                value: downRightValue
            },
        ]
    }

    checkOutsideTop(id){
        let down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left),
            downLeft = parseInt(id) + 7,
            downLeftValue = this.checkSpaces(downLeft),
            downRight = parseInt(id) + 9,
            downRightValue = this.checkSpaces(downRight);

        return [
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'downRight',
                id: downRight,
                value: downRightValue
            },
            {
                direction: 'downLeft',
                id: downLeft,
                value: downLeftValue
            }
        ]
    }

    checkOutsideBottom(id){
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left),
            upRight = parseInt(id) - 7,
            upRightValue = this.checkSpaces(upRight),
            upLeft = parseInt(id) - 9,
            upLeftValue = this.checkSpaces(upLeft);

        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'upRight',
                id: upRight,
                value: upRightValue
            },
            {
                direction: 'upLeft',
                id: upLeft,
                value: upLeftValue
            }
        ]
    }

    checkTopRight(id){
        let down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left),
            downLeft = parseInt(id) + 7,
            downLeftValue = this.checkSpaces(downLeft)
        return [
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'downLeft',
                id: downLeft,
                value: downLeftValue
            }
        ]
    }

    checkTopLeft(id){
        let down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            downRight = parseInt(id) + 9,
            downRightValue = this.checkSpaces(downRight);
        return [
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'downRight',
                id: downRight,
                value: downRightValue
            }
        ]
    }

    checkBottomLeft(id){
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            upRight = parseInt(id) - 7,
            upRightValue = this.checkSpaces(upRight);

        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'upRight',
                id: upRight,
                value: upRightValue
            }
        ]


    }

    checkBottomRight(id){
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            upLeft = parseInt(id) - 9,
            upLeftValue = this.checkSpaces(upLeft),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left);
        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'upLeft',
                id: upLeft,
                value: upLeftValue
            }
        ]
    }

    checkAll(id) {
        // debugger
        let up = parseInt(id) - 8,
            upValue = this.checkSpaces(up),
            down = parseInt(id) + 8,
            downValue = this.checkSpaces(down),
            right = parseInt(id) + 1,
            rightValue = this.checkSpaces(right),
            left = parseInt(id) - 1,
            leftValue = this.checkSpaces(left),
            upRight = parseInt(id) - 7,
            upRightValue = this.checkSpaces(upRight),
            upLeft = parseInt(id) - 9,
            upLeftValue = this.checkSpaces(upLeft),
            downRight = parseInt(id) + 9,
            downRightValue = this.checkSpaces(downRight),
            downLeft = parseInt(id) + 7,
            downLeftValue = this.checkSpaces(downLeft);

        return [
            {
                direction: 'up',
                id: up,
                value: upValue
            },
            {
                direction: 'down',
                id: down,
                value: downValue
            },
            {
                direction: 'left',
                id: left,
                value: leftValue
            },
            {
                direction: 'right',
                id: right,
                value: rightValue
            },
            {
                direction: 'upRight',
                id: upRight,
                value: upRightValue
            },
            {
                direction: 'upLeft',
                id: upLeft,
                value: upLeftValue
            },
            {
                direction: 'downRight',
                id: downRight,
                value: downRightValue
            },
            {
                direction: 'downLeft',
                id: downLeft,
                value: downLeftValue
            }

        ]
    }

    findNeighbors(id) {
        let outsideRight = [15, 23, 31, 39, 47, 55];
        let outsideBottom = [57, 58, 59, 60, 61, 62];
        let outsideLeft = [8, 16, 24, 32, 40, 48];
        let outsideTop = [1, 2, 3, 4, 5, 6];
        let topLeft = 0;
        let topRight = 7;
        let bottomLeft = 56;
        let bottomRight = 63;
        let result;
        if (outsideRight.includes(parseInt(id))) {
            result = this.checkOutsideRight(id)
        } else if(outsideBottom.includes(parseInt(id))){
            result = this.checkOutsideBottom(id);
        } else if(outsideLeft.includes(parseInt(id))){
            result = this.checkOutsideLeft(id);
        }else if(outsideTop.includes(parseInt(id))){
            result = this.checkOutsideTop(id);
        } else if(topLeft === parseInt(id)){
            result = this.checkTopLeft(id);
        }else if(topRight === parseInt(id) ){
            result = this.checkTopRight(id);
        } else if(bottomLeft === parseInt(id)){
            result = this.checkBottomLeft(id);
        } else if (bottomRight === parseInt(id) ){
            result = this.checkBottomRight(id);
        } else {
            result = this.checkAll(id);
        }

        return result;
    }

    findNeighborsDirection(direction) {
        let outside = [15, 23, 31, 39, 47, 55,57, 58, 59, 60, 61, 62,8, 16, 24, 32, 40, 48, 1, 2, 3, 4, 5, 6, 0,7 , 56, 63]
        // if(color === targetCellColor) {
        //     return piecesToBeFlipped
        // }

        // if(outside.includes(parseInt(id))){
        //
        // }
    }

    checkLegalMoves(id) {
        let currentNeighbors = this.findNeighbors(id);
        let currentId = id;
        let legal = false;
        let currentTurnOpposite = this.state.turnCount % 2 === 0 ? "White" : "Black"
        let currentCell = this.state.cells[currentId]

        let oppositeNeighbors = currentNeighbors.filter((neighbor) => {
            return neighbor.value === currentTurnOpposite
        })

        // let pieces = this.state.piecesToBeFlipped;
        // pieces.push(oppositeNeighbors[0])
        // this.setState({piecesToBeFlipped: pieces});
        const pieces = this.traverseBoard(oppositeNeighbors[0], 8)
        console.log(pieces)
        this.setState({piecesToBeFlipped: pieces})
        debugger
        if(this.state.piecesToBeFlipped.length > 0) {
            legal = true;
            this.flipPiece();
        }
        return legal;
    }

    traversePromise() {
        
    }

    traverseBoard(cell, direction) {
        let outside = [15, 23, 31, 39, 47, 55,57, 58, 59, 60, 61, 62,8, 16, 24, 32, 40, 48, 1, 2, 3, 4, 5, 6, 0,7 , 56, 63]
        let currentTurn = this.state.turnCount % 2 === 0 ? "Black" : "White";
        let nextCellId = cell.id + direction
        let nextCell = this.state.cells.filter((item) => {
            return item.id === nextCellId
        })
        // let pieces = this.state.piecesToBeFlipped
        let pieces = []

        if(outside.indexOf(cell.id) > -1 && cell.value !== currentTurn) {
            pieces = []
            // this.setState({piecesToBeFlipped: []})
            return pieces;
        } else if (cell.value === "Empty") {
            pieces = []
            // this.setState({piecesToBeFlipped: pieces})
            debugger
            return pieces;
        } else if (cell.value === currentTurn) {
            return pieces
        } else {
            pieces.push(cell)
            this.traverseBoard(nextCell[0], direction)
            // this.setState({piecesToBeFlipped: pieces})
        }

        console.log('this should never be hit')
        return pieces

        // return this.traverseBoard(nextCell[0], direction)





        // if (nextCell[0].value === cell.value) {
        //     this.setState({piecesToBeFlipped: this.state.piecesToBeFlipped.concat([nextCell[0]])})
        //     traverseBoard(nextCell[0], direction)
        // } else if (nextCell[0].value === currentTurn) {
        //
        // }
    }

    renderPiece(event){
        // console.log(event.target.id)
        const cells = this.state.cells;
        let turnCount = this.state.turnCount;
        let occupied = this.state.occupiedCells;
        let currentValue;
        if (this.state.cells[event.target.id].value !== "Empty") {
            currentValue = this.state.cells[event.target.id].value;
            return "Empty"
            } else if (this.state.turnCount %2 === 0) {
                if(this.checkLegalMoves(event.target.id)){
                    cells[event.target.id].value = "Black"
                    turnCount++
                    occupied = {[event.target.id] : cells[event.target.id].value}
                    this.setState({/**cells: cells,**/ turnCount: turnCount, occupiedCells: occupied})
                } else {
                    cells[event.target.id].value = currentValue
                }

                return "Done"
            } else {
                if(this.checkLegalMoves(event.target.id)){
                    cells[event.target.id].value = "White"
                    turnCount++
                    occupied = {[event.target.id] : cells[event.target.id].value}
                    this.setState({/**cells: cells,**/ turnCount: turnCount, occupiedCells: occupied})
                } else {
                    cells[event.target.id].value = currentValue
                }
                return "Done"
            }
    }

    render() {
        this.generateBoardSpaces()

        return(
            <div id="board" className="board" onClick={this.addPiece}>
                {this.state.cells.map((cell, index) =>{
                    return(
                    <div className="cell" key={index} id={index} onClick={this.renderPiece}>
                        <div className={this.addPiece(cell.value)}></div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Board;
