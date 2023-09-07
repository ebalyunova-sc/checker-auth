import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../App';
import GameService from '../../services/GameService';
import Board from '../classes/Board';
import UserInfo from '../classes/UserInfo';

import { searchCheckerByCoordinates } from '../functions/checkersFunctions';
import { checkerCanMove } from '../functions/moveFunctions';
import { playerCanTakeChecker } from '../functions/takeFunctions';
import { playerCanTakeEnemyCheckers,
         checkerCanTakeEnemyChecker,
         checkerCanMoveAnywhere } from '../functions/settingSelectedCheckerFunctions';

import '../style/gamePage.css';

const GamePage = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    let cells = [];
        for (let i = 0; i < 8; i++) {
            cells[i] = [];
        }
    const [game, setGame] = useState({
        board: cells,
        currentPlayer: '',
        whiteCheckers: [],
        blackCheckers: [],
        gameStatus: '',
    });
    const [selectedCellWithChecker, setSelectedCellWithChecker] = useState({x: null, y: null});
    const [multipleTake, setMultipleTake] = useState(false);

    useEffect(() => {
        store.checkAuth();
        if (!localStorage.getItem('auth'))
        {
            navigate('/login');
        }
        initGame();
    }, [localStorage.getItem('auth')]);

    const initGame = async () => {
        try {
            const response = await GameService.initGame();
            setGame({
                board: response.data.board,
                currentPlayer: response.data.currentPlayer,
                whiteCheckers: response.data.whiteCheckers,
                blackCheckers: response.data.blackCheckers,
                gameStatus: response.data.gameStatus,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const choiceCellsForMove = (x, y, cellIsEmpty, color) => {
        if (cellIsEmpty === false) 
        {
            if (game.currentPlayer === 'white player')
            {
                choiceCellWithChecker(game.whiteCheckers, game.blackCheckers, x, y);
            }
            else
            {
                choiceCellWithChecker(game.blackCheckers, game.whiteCheckers, x, y);
            }
        }
        else if (color === 'black'
                 && selectedCellWithChecker.x !== null
                 && selectedCellWithChecker.y !== null)
        {
            if (game.currentPlayer === 'white player')
            {
                choiceCellWithoutChecker(game.whiteCheckers, game.blackCheckers, x, y);
            }
            else
            {
                choiceCellWithoutChecker(game.blackCheckers, game.whiteCheckers, x, y);
            }
        }
    }

    const choiceCellWithChecker = (currentPlayersCheckers, waitingPlayersCheckers, x, y) => {
        console.log(multipleTake);
        if (playerCanTakeEnemyCheckers(currentPlayersCheckers, waitingPlayersCheckers)
            && multipleTake === false)
        {
            if (checkerCanTakeEnemyChecker(currentPlayersCheckers, waitingPlayersCheckers, x, y)
                && searchCheckerByCoordinates(currentPlayersCheckers, x, y) !== null)
            {
                let tempGame = game;
                if (selectedCellWithChecker.x !== null
                    && selectedCellWithChecker.y !== null)
                {
                    tempGame.board[selectedCellWithChecker.y - 1][selectedCellWithChecker.x - 1]
                        .color = 'black';
                }
                setSelectedCellWithChecker({x: x, y: y});
                tempGame.board[y - 1][x - 1].color = 'selected';
                setGame(tempGame);
            }
        }
        else if (checkerCanMoveAnywhere(currentPlayersCheckers, waitingPlayersCheckers, x, y)
                 && searchCheckerByCoordinates(currentPlayersCheckers, x, y) !== null
                 && multipleTake === false)
        {
            let tempGame = game;
            if (selectedCellWithChecker.x !== null
                && selectedCellWithChecker.y !== null)
            {
                tempGame.board[selectedCellWithChecker.y - 1][selectedCellWithChecker.x - 1]
                    .color = 'black';
            }
            setSelectedCellWithChecker({x: x, y: y});
            tempGame.board[y - 1][x - 1].color = 'selected';
            setGame(tempGame);
        }
    }

    const choiceCellWithoutChecker = async (currentPlayersCheckers, waitingPlayersCheckers, x, y) => {
        if (checkIfPlayerCanTakeChecker(selectedCellWithChecker.x, selectedCellWithChecker.y, x, y))
        {
            const response =
                await GameService.take(selectedCellWithChecker.x, selectedCellWithChecker.y, x, y);
            let tempGame = {
                board: response.data.board,
                currentPlayer: response.data.currentPlayer,
                whiteCheckers: response.data.whiteCheckers,
                blackCheckers: response.data.blackCheckers,
                gameStatus: response.data.gameStatus,
            };
            let tempCurrentPlayersCheckers, tempWaitingPlayersCheckers;
            if (tempGame.currentPlayer === 'white player')
            {
                tempCurrentPlayersCheckers = tempGame.whiteCheckers;
                tempWaitingPlayersCheckers = tempGame.blackCheckers;
            }
            else 
            {
                tempCurrentPlayersCheckers = tempGame.blackCheckers;
                tempWaitingPlayersCheckers = tempGame.whiteCheckers;
            }
            if (searchCheckerByCoordinates(tempCurrentPlayersCheckers, x, y) !== null
                && checkerCanTakeEnemyChecker
                    (tempCurrentPlayersCheckers, tempWaitingPlayersCheckers, x, y))
            {
                setMultipleTake(true);
                setSelectedCellWithChecker({x: x, y: y});
                tempGame.board[y - 1][x - 1].color = 'selected';
            }
            else
            {
                setMultipleTake(false);
                setSelectedCellWithChecker({x: null, y: null});
            }
            setGame(tempGame);
        }
        else if (playerCanTakeEnemyCheckers(currentPlayersCheckers, waitingPlayersCheckers) !== true
                 && checkIfCheckerCanMove(selectedCellWithChecker.x, selectedCellWithChecker.y, x, y))
        {
            const response =
                await GameService.move(selectedCellWithChecker.x, selectedCellWithChecker.y, x, y);
            setGame({
                board: response.data.board,
                currentPlayer: response.data.currentPlayer,
                whiteCheckers: response.data.whiteCheckers,
                blackCheckers: response.data.blackCheckers,
                gameStatus: response.data.gameStatus,
            });
            setSelectedCellWithChecker({x: null, y: null});
        }
    }

    const checkIfPlayerCanTakeChecker = (x1, y1, x2, y2) => {
        if (game.currentPlayer === 'white player')
        {
            return playerCanTakeChecker(game.whiteCheckers, game.blackCheckers, x1, y1, x2, y2);
        }
        else
        {
            return playerCanTakeChecker(game.blackCheckers, game.whiteCheckers, x1, y1, x2, y2);
        }
    }

    const checkIfCheckerCanMove = (x1, y1, x2, y2) => {
        if (game.currentPlayer === 'white player')
        {
            return checkerCanMove(game.whiteCheckers, game.blackCheckers, x1, y1, x2, y2);
        }
        else 
        {
            return checkerCanMove(game.blackCheckers, game.whiteCheckers, x1, y1, x2, y2);
        }
    }

    return(
        <>
            <div className='gameEnvironment' />
            <UserInfo
                userName={'white player'}
                userColor={'white'}
                currentPlayer={game.currentPlayer === 'white player' ? true : false}
            />
            <Board
                board={game.board}
                onClick={choiceCellsForMove}
            />
            <UserInfo
                userName={'black player'}
                userColor={'black'}
                currentPlayer={game.currentPlayer === 'black player' ? true : false}
            />
        </>
    );
}

export default GamePage;