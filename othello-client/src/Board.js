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
      piecesToBeFlipped: [],
      outsideRight: [15, 23, 31, 39, 47, 55],
      outsideBottom: [57, 58, 59, 60, 61, 62],
      outsideLeft: [8, 16, 24, 32, 40, 48],
      outsideTop: [1, 2, 3, 4, 5, 6],
      topLeft: 0,
      topRight: 7,
      bottomLeft: 56,
      bottomRight: 63,
      illegalMove: false
    }
    this.addPiece = this.addPiece.bind(this);
    this.renderPiece = this.renderPiece.bind(this);
    this.generateBoardSpaces = this.generateBoardSpaces.bind(this);
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
    this.calculateScore = this.calculateScore.bind(this);
  }

  flipPiece() {
    const currentTurn = this.state.turnCount % 2 ===0 ? "Black" : "White"
    let newCells = []
    let cellHolder = this.state.cells.forEach((cell) => {
      this.state.piecesToBeFlipped.forEach((piece) => {
        if (cell.id === piece.id) {
          cell.value = currentTurn
        }
        newCells.push(cell)
      })
    })
    const emptyFlip = []
    this.setState({cells: newCells, piecesToBeFlipped: emptyFlip})
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
    return this.state.cells[id].value
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: -9,
        id: upLeft,
        value: upLeftValue
      },
      {
        direction: 7,
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: -7,
        id: upRight,
        value: upRightValue
      },
      {
        direction: 9,
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
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: 9,
        id: downRight,
        value: downRightValue
      },
      {
        direction: 7,
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: -7,
        id: upRight,
        value: upRightValue
      },
      {
        direction: -9,
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
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: 7,
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
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: 9,
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: -7,
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: -9,
        id: upLeft,
        value: upLeftValue
      }
    ]
  }

  checkAll(id) {
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
        direction: -8,
        id: up,
        value: upValue
      },
      {
        direction: 8,
        id: down,
        value: downValue
      },
      {
        direction: -1,
        id: left,
        value: leftValue
      },
      {
        direction: 1,
        id: right,
        value: rightValue
      },
      {
        direction: -7,
        id: upRight,
        value: upRightValue
      },
      {
        direction: -9,
        id: upLeft,
        value: upLeftValue
      },
      {
        direction: 9,
        id: downRight,
        value: downRightValue
      },
      {
        direction: 7,
        id: downLeft,
        value: downLeftValue
      }
    ]
  }

  findNeighbors(id) {
    let result;

    if (this.state.outsideRight.includes(parseInt(id))) {
      result = this.checkOutsideRight(id)
    } else if(this.state.outsideBottom.includes(parseInt(id))){
      result = this.checkOutsideBottom(id);
    } else if(this.state.outsideLeft.includes(parseInt(id))){
      result = this.checkOutsideLeft(id);
    }else if(this.state.outsideTop.includes(parseInt(id))){
      result = this.checkOutsideTop(id);
    } else if(this.state.topLeft === parseInt(id)){
      result = this.checkTopLeft(id);
    }else if(this.state.topRight === parseInt(id) ){
      result = this.checkTopRight(id);
    } else if(this.state.bottomLeft === parseInt(id)){
      result = this.checkBottomLeft(id);
    } else if (this.state.bottomRight === parseInt(id) ){
      result = this.checkBottomRight(id);
    } else {
      result = this.checkAll(id);
    }
    return result;
  }

  calculateScore(){
    let black = 0;
    let white = 0;
    this.state.cells.forEach((cell) => {
      if (cell.value === "Black") {
        black++
      } else if (cell.value === "White") {
        white++
      }
    })
    return [black, white];
  }

  checkLegalMoves(id) {
    let currentNeighbors = this.findNeighbors(id);
    let currentId = id;
    let legal = false;
    let currentTurnOpposite = this.state.turnCount % 2 === 0 ? "White" : "Black"
    let currentCell = this.state.cells[currentId]

    let oppositeNeighbors = currentNeighbors.filter((neighbor) => {
      return neighbor.value === currentTurnOpposite
    });

    let pieces = [];
    oppositeNeighbors.forEach((cell) => {
      let traversedPieces = this.traverseBoard(cell, cell.direction)
      pieces.push(traversedPieces);
    });
    let flattenedPieces = [].concat.apply([], pieces)
    this.state.piecesToBeFlipped = flattenedPieces
    this.setState({piecesToBeFlipped: this.state.piecesToBeFlipped})

    if(this.state.piecesToBeFlipped.length > 0) {
      legal = true;
      this.flipPiece();
    }
    return legal;
  }

  traverseBoard(cell, direction, currentPieces) {
    let outside = [15, 23, 31, 39, 47, 55,57, 58, 59, 60, 61, 62,8, 16, 24, 32, 40, 48, 1, 2, 3, 4, 5, 6, 0,7 , 56, 63]
    let currentTurn = this.state.turnCount % 2 === 0 ? "Black" : "White";
    let nextCellId = cell.id + direction
    let nextCell = this.state.cells.filter((item) => {
      return item.id === nextCellId
    })

    let pieces = currentPieces || [];

    if(outside.indexOf(cell.id) > -1 && cell.value !== currentTurn ) {

      pieces = [];
      return pieces;
    } else if (cell.value === "Empty") {
      pieces = [];
      return pieces;
    } else if (cell.value === currentTurn) {
      return pieces
    } else {
      pieces.push(cell);
      return this.traverseBoard(nextCell[0], direction, pieces)
    }
  }

  renderPiece(event){
    const cells = this.state.cells;
    let turnCount = this.state.turnCount;
    let occupied = this.state.occupiedCells;
    let currentValue = "Empty";
    if (cells[event.target.id].value !== "Empty" || cells[event.target.id].value === undefined) {
      cells[event.target.id].value = "Empty"
      currentValue = this.state.cells[event.target.id].value;
    } else if (this.state.turnCount %2 === 0) {
      cells[event.target.id].value = "Black"
      if(this.checkLegalMoves(event.target.id)){
        turnCount++
        this.calculateScore();
        occupied = {[event.target.id] : cells[event.target.id].value}
        this.setState({illegalMove: false, cells: cells, turnCount: turnCount, occupiedCells: occupied})
      } else {
        this.setState({illegalMove: true})
        cells[event.target.id].value = currentValue
      }
      return "Done"
    } else {
      cells[event.target.id].value = "White"
      if(this.checkLegalMoves(event.target.id)){
        turnCount++
        this.calculateScore();
        occupied = {[event.target.id] : cells[event.target.id].value}
        this.setState({illegalMove: false, cells: cells, turnCount: turnCount, occupiedCells: occupied})
      } else {
        this.setState({illegalMove: true})
        cells[event.target.id].value = currentValue
      }
      return "Done"
    }
  }

  render() {
    this.generateBoardSpaces()
    return(
    <div className="">
      <nav id="navbar" className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a id="brand" className="navbar-brand">
              TEAM PLAGUE!
            </a>
          </div>
        </div>
      </nav>
          <h1 className="text-center">{this.state.turnCount % 2 === 0 ? "Black" : "White"}'s turn</h1>
          <div className="container text-center">
            <h2>Score:</h2>
            <h3>Black: {this.calculateScore()[0]}</h3>
            <h3>White: {this.calculateScore()[1]}</h3>
            <h4 className="text-info">{this.state.illegalMove ? "nope" : "Make your move"}</h4>
          </div>

          <div id="board" className="board" onClick={this.addPiece}>
              {this.state.cells.map((cell, index) =>{
                  return(
                      <div className="cell" key={index} id={index} onClick={this.renderPiece}>
                          <div className={this.addPiece(cell.value)}></div>
                      </div>
                  )
              })}
          </div>
      </div>
        );
    }
}

export default Board;
