import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component {
    render() {
        return (
            <div className='board'>
                {
                    this.props.board.map((row, index) =>
                        row.map((cell) => (
                            <Cell
                                x={cell.x}
                                y={cell.y}
                                color={cell.color}
                                checker={cell.checker}
                                onClick={() => this.props.onClick(cell.x, cell.y,
                                    ((cell.checker === null) ? true : false), cell.color)}
                            />
                        )))
                }
            </div>
        )
    }
}