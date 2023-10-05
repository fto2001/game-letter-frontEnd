import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import StartScreen from './start-screen';
import WaitingRoom from './waiting-room';
import GameScreen from './game-screen';
import './index.css'

const socket = io('http://192.168.11.145:7000');

enum Events {
    RANDOM_LETTER = 'randomLetter',
    SCORE_UPDATE = 'scoreUpdate',
    INCREMENT_SCORE = 'incrementScore',
    WIN = 'win',
    SET_NICKNAME = 'setNickName',
    OPPONENT_UPDATE = 'opponentUpdate',
    JOIN_ROOM = 'joinRoom',
    CREATE_ROOM = 'createRoom',
    ROOM_NOT_FOUND = 'roomNotFound',
    LETTER_UPDATE = 'letterUpdate'
}

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('start');
    const [nickName, setNickName] = useState('');
    const [score, setScore] = useState(0);
    const [opponents, setOpponents] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [winningScore, setWinningScore] = useState(0);
    const [currentLetter, setCurrentLetter] = useState('');
    const [letterArray, setLetterArray] = useState([]);

    useEffect(() => {
        socket.on(Events.RANDOM_LETTER, (data) => {
            setCurrentLetter(data.letter);
        });

        socket.on(Events.SCORE_UPDATE, ({ playerId, score }) => {
            if (playerId === socket.id) {
                setScore(score);
                socket.emit(Events.OPPONENT_UPDATE)
            } else {
                socket.emit(Events.OPPONENT_UPDATE);
            }
        });

        socket.on(Events.ROOM_NOT_FOUND, () => {
            setCurrentScreen('waitingRoom');
            alert('Room not found. Please try again.');
        });

        socket.on(Events.LETTER_UPDATE, ({ letter }) => {
            setCurrentLetter(letter);
        });

        socket.on(Events.SET_NICKNAME, ({ playerId, nickName, roomId, winningScore }) => {
            if (playerId === socket.id) {
                setNickName(nickName);
                setRoomId(roomId);
                setWinningScore(winningScore);
            } else {
                socket.emit(Events.OPPONENT_UPDATE);
            }
        });

        socket.on(Events.CREATE_ROOM, ({ roomId, letterArray }) => {
            setRoomId(roomId);
            setCurrentScreen('game');
            setLetterArray(letterArray);
        });

        socket.on(Events.OPPONENT_UPDATE, (roomPlayers) => {
            setOpponents(roomPlayers);
        });

        socket.on(Events.WIN, () => {
            setScore(0);
        });

        socket.emit(Events.OPPONENT_UPDATE);

        socket.on(Events.LETTER_UPDATE, ({ letter }) => {
            setCurrentLetter(letter);
            console.log("Received Letter:", letter);
        });

        socket.on('disconnect', () => {
            setCurrentScreen('start');
            setNickName('');
            setCurrentLetter('');
            setScore(0);
            setOpponents([]);
        });

        return () => {
            for (const valid in Events) {
                socket.off(valid)
            }
        }
    }, []);

    const handleStartClick = () => {
        setCurrentScreen('waitingRoom');
    };

    const handleCreateRoomClick = (nickName: string, winningScore: any) => {
        setNickName(nickName);
        setWinningScore(winningScore)
        setCurrentScreen('waitingRoom');
        socket.emit(Events.CREATE_ROOM, { nickName, winningScore: parseInt(winningScore, 10) });
    };

    const handleWaitingRoomSubmit = (nickName: string, roomId: string) => {
        setNickName(nickName);
        setRoomId(roomId);
        setCurrentScreen('game');
        socket.emit(Events.JOIN_ROOM, { nickName, roomId, winningScore });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toUpperCase() === currentLetter) {
            socket.emit(Events.INCREMENT_SCORE);
            socket.emit(Events.RANDOM_LETTER);

            socket.emit(Events.LETTER_UPDATE, { letter: letterArray[0] });
        }
    };

    return (
        <div>
            {currentScreen === 'start' && <StartScreen onStartClick={handleStartClick} />}
            {currentScreen === 'waitingRoom' && <WaitingRoom onSubmit={handleWaitingRoomSubmit} onCreateRoomClick={handleCreateRoomClick} />}
            {currentScreen === 'game' && (
                <GameScreen
                    nickName={nickName}
                    currentLetter={currentLetter}
                    score={score}
                    handleKeyDown={handleKeyDown}
                    opponents={opponents}
                    roomId={roomId}
                    winningScore={winningScore}
                    letterArray={letterArray}
                />
            )}
        </div>
    );
}

export default App;