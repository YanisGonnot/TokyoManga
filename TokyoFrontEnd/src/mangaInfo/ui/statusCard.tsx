import '../style/statusCard.css';

interface StatusCardProps{
    text: string;
    color: string;
}

const StatusCard = ({text, color}: StatusCardProps) => {
    return (
        <>
            <div className='statusCardStyle' style={{backgroundColor:color}}>
                <h3> {text}</h3>
            </div>
        </>
    )
}

export default StatusCard