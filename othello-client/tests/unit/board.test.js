import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../../src/Board';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

describe("Board", ()=> {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Board />, div);
    })

    it('starts the game with the correct pieces', () => {
        const div = document.createElement('div');
        const app = shallow(<Board />, div);

        const board = app.find('#board');
        const blackPieces = board.find(".Black");
        const whitePieces = board.find(".White");


        expect(blackPieces.length).toBe(2);
        expect(whitePieces.length).toBe(2);
    })

    xit('cannot click on an occupied space', () => {
        const div = document.createElement('div');
        const app = shallow(<Board />, div);

        const board = app.find("#board");
        const blackPieces = board.find(".Black");
        const whitePieces = board.find(".White");
        const piece = board.find('#27')
        piece.simulate('click')
        // const


    })
    xit("click calls addPiece function", ()=> {
        const div = document.createElement('div');
        const mockAddPiece = jest.fn()
        const board = shallow(<Board />, div);

        console.log(board.node._self)

        board.node._self.addPiece = mockAddPiece;
        expect(mockAddPiece).toHaveBeenCalledTimes(1)
    })


})
