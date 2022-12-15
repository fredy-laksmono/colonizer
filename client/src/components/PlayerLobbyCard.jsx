const PlayerLobbyCard = ({ player, isHost, isMe, onKick }) => {
    return (
        <div className="player-lobby-card">
        <div className="player-lobby-card__name">{player.name}</div>
        </div>
    );
}

export default PlayerLobbyCard;