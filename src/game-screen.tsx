import React, { useEffect } from 'react';

interface Player {
    playerId: string;
    score: number;
    nickName: string;
    roomId: string;
    winningScore: number;
    currentLetter: string;
};

interface GameScreenProps {
    nickName: string;
    currentLetter: string;
    score: number;
    opponents: Player[];
    handleKeyDown: (event: KeyboardEvent) => void;
    roomId: string;
    winningScore: number;
    letterArray: string[];
}

const GameScreen: React.FC<GameScreenProps> = ({ nickName, currentLetter, score, handleKeyDown, opponents, roomId, winningScore, letterArray }) => {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentLetter]);

    return (
        <div>
            <div className="header">
                <h1>Welcome, {nickName}!</h1>
                <p>Score for a win: {winningScore}</p>
                <p>Room ID: {roomId}</p>
                <p>Score: {score}</p>
                <p>Opponents:</p>
                <p>Letter Array: {letterArray.join(', ')}</p>
            </div>
            <div className="board">{currentLetter}</div>
            <ul className="online-list">
                {opponents
                    .filter((opponent) => opponent.nickName !== "")
                    .map((opponent, index) => (
                        <li key={index}>{opponent.nickName} - Score: {opponent.score}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default GameScreen;