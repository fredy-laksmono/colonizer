const PlayerStatusCard = ({ player }) => {
    return (
        <div className="player-status-card">
        <div className="player-status-card__name">{player.name}</div>
        <div className="player-status-card__health">{player.health}</div>
        </div>
    );
}
export default PlayerStatusCard;