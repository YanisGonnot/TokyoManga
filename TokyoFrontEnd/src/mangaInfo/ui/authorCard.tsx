import '../style/authorCard.css'


interface AuthorProps{
    name : string;
}


const AuthorCard = ({name} : AuthorProps) => {

    return (
        <>
            <div className='authorItem'>
                {name.replace(',', '')}
            </div>
        </>
    )
}

export default AuthorCard