import React, {Component} from 'react';
import './App.css'

export class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cellValue: this.renderPiece,
            turnCount: 0,
            cells: [],
            gameStatus: "New"
        }
        this.addPiece = this.addPiece.bind(this);
        this.renderPiece = this.renderPiece.bind(this);
        this.generateBoardSpaces = this.generateBoardSpaces.bind(this);

    }

    addPiece(piece) {
        const pieceLookup = {
                    "Black": <div className="Black"></div>,
                    "White": <div className="White"></div>
                    }
        return pieceLookup[piece]
    }

    generateBoardSpaces(){
        if(this.state.gameStatus === "New"){
            let spaces = []
            for(var i = 0; i < 64; i++){
                spaces.push({'id' : i, 'value' : "Empty"})
            }
            while(this.state.cells.length < 64){
                spaces.map((id) => {
                    return this.state.cells.push(id)
                })
            }
        }

    }


    renderPiece(event){
        // console.log("im being called", event.target.id)
        // console.log("turn count:", this.state.turnCount)
        const cells = this.state.cells
        let turnCount = this.state.turnCount
        if (this.state.cells[event.target.id].value !== "Empty") {
            return "Empty"
        } else if (this.state.turnCount %2 === 0) {
            cells[event.target.id].value = "Black"
            console.log(cells[event.target.id].value)
            // this.addPiece(cells[event.target.id].value)
            turnCount++
            this.setState({cells: cells, turnCount: turnCount})
            return "Done"
        } else {
            cells[event.target.id].value = "White"
            console.log(cells[event.target.id].value)
            // this.addPiece(cells[event.target.id].value)
            turnCount++
            this.setState({cells: cells, turnCount: turnCount})
            return "Done"
        }
    }

    render() {
        this.generateBoardSpaces()

        // console.log("cells in state", this.state.cells)
        return(
            <div id="board" className="board" onClick={this.addPiece}>
                {this.state.cells.map((cell, index) =>{
                    return <div className="cell" key={index} id={index} onClick={this.renderPiece}>{this.addPiece(cell.value)}</div>
                })}

            </div>
        );
    }
}

export default Board;
