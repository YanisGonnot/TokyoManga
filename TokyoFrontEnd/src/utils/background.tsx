import { ReactElement, useRef } from "react";

function Background(path : string) : ReactElement {
    const backgroundImageRef = useRef<HTMLDivElement>(null)
    const backgroundShadowRef = useRef<HTMLDivElement>(null)

    if (backgroundImageRef.current){
        backgroundImageRef.current.style.backgroundImage = path
    }

    if (backgroundShadowRef.current){
        backgroundShadowRef.current.style.backgroundImage = './assets/sombra.png';
        backgroundShadowRef.current.style.zIndex = '-1';
        backgroundShadowRef.current.style.backgroundSize = 'cover';
        backgroundShadowRef.current.style.backgroundRepeat = 'no-repeat';
        backgroundShadowRef.current.style.backgroundPosition = 'center';     
    }
    
    return (
        <div ref={backgroundImageRef}>
            <div ref={backgroundShadowRef}/>
        </div>
        
    )
}

export default Background