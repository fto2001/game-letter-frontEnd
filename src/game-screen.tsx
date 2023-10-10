import React, { useEffect } from 'react';

interface Player {
    playerId: string;
    score: number;
    nickName: string;
    roomId: string;
    winningScore: number;
    currentLetter: string;
}

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
            return () => window.removeEventListener('keydown', handleKeyDown)},
        [currentLetter]);

    return (
        <div>
            <div className="header">
                <h1>Welcome, <span className="game-screen__special-label">{nickName}!</span></h1>
                <p>Score for a win: <span className="game-screen__special-label">{winningScore}</span></p>
                <p>Room ID: <span className="game-screen__special-label">{roomId}</span></p>
                <p>Score: <span className="game-screen__special-label">{score}</span></p>
                <p className="letter-array">{letterArray && letterArray.length > 0 && (
                    <span>
                        Letter Array: <span className="game-screen__special-label">{letterArray.join(', ')}</span>
                    </span>)}
                </p>
            </div>
            <div className="board">{currentLetter}</div>
            <p>Online users in room:</p>
            <ul className="online-list">
                { opponents.filter((opponent) => opponent.nickName !== "").map((opponent, index) => (
                    <li className="online-list__user" key={index}><span className="game-screen__special-label">{opponent.nickName}</span> - Score: <span className="game-screen__special-label">{opponent.score}</span></li>))
                }
            </ul>
        </div>);
};
export default GameScreen;