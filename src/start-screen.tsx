import React from 'react';

interface StartScreenProps {
    onStartClick: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartClick }) => {
    return (
        <div>
            <h1>Welcome to the game: "The fastest in Unibrix!"</h1>
            <button className='button-start' onClick={onStartClick}>Start</button>
        </div>
    );
};

export default StartScreen;