import React, { useState } from 'react';

interface WaitingRoomProps {
    onSubmit: (nickName: string, roomId: string, winningScore: any) => void;
    onCreateRoomClick: (nickName: string, winningScore: any) => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ onSubmit, onCreateRoomClick }) => {
    const [nickName, setNickName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [winningScore, setWinningScore] = useState(20);

    const handleCreateRoom = () => {
        if (nickName.trim() !== '' && winningScore) {
            onCreateRoomClick(nickName, winningScore);
        } else {
            alert('Field nickName or winningScore is empty!');
        }
    }

    const handleSubmitJoin = (e: React.FormEvent) => {
        e.preventDefault();

        if (nickName.trim() !== '' && roomId.trim() !== '' && winningScore) {
            onSubmit(nickName, roomId, winningScore);
        } else {
            alert('Both fields are required!');
        }
    }

    return (
        <div>
            <h1>Waiting Room</h1>
            <button className='button-start' onClick={handleCreateRoom}>Create Room</button>
            <form onSubmit={handleSubmitJoin}>
                <input
                    className='input-waiting'
                    type="text"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="Enter your nickname"
                />
                <input
                    className='input-waiting'
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room ID"
                />
                <input
                    className='input-waiting'
                    type="number"

                    value={winningScore}
                    onChange={(e) => setWinningScore(+e.target.value)}
                    placeholder="Enter winning score"
                />
                <button className='button-start' type="submit">Join</button>
            </form>
        </div>
    );
};

export default WaitingRoom;