const RaceSelectCard = ({ race }) => {
    return <option value={race.id}>{race.name}</option>;
};

export default RaceSelectCard;
