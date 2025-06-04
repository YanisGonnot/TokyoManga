import '../style/themePastille.css';



export interface PastilleProps {
    theme?: string;
    type? : string
}

const ThemePastille = ({ theme }: PastilleProps) => {
    return (
        <>
            <p className='themePastilleWrapper'>
                {theme}
            </p>
        </>
    )
}


export default ThemePastille;