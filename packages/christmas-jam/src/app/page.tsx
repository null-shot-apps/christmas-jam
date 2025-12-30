'use client';

import { useState } from 'react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Board): Player | 'Draw' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    if (newBoard.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
          Tic Tac Toe
        </h1>

        {/* Game status */}
        <div className="mb-6 text-2xl font-semibold text-center">
          {winner ? (
            winner === 'Draw' ? (
              <span className="text-yellow-300">It&apos;s a Draw!</span>
            ) : (
              <span className="text-green-300">Player {winner} Wins! 🎉</span>
            )
          ) : (
            <span>Player {currentPlayer}&apos;s Turn</span>
          )}
        </div>

        {/* Game board */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg
                flex items-center justify-center text-4xl md:text-5xl font-bold
                transition-all duration-200 hover:bg-white/20 hover:scale-105
                ${cell ? 'cursor-default' : 'cursor-pointer'}
                ${cell === 'X' ? 'text-blue-300' : 'text-pink-300'}`}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full
            text-lg font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105"
        >
          New Game
        </button>
      </main>
    </div>
  );
}

