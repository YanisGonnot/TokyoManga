import { ReactElement } from "react";
import Background from "./background";


interface LayoutProps {
    screen: React.ReactNode;
    backgroundPath? : string;
}



const Layout = ({screen, backgroundPath} : LayoutProps) : ReactElement => {

    const element : ReactElement = backgroundPath != undefined 
        ? <div style={{ position: 'relative', minHeight: '100dvh'}}>
            {Background(backgroundPath)}
        
          <div>
            {screen}
          </div>            
        </div>

        : <div>
            {screen}
        </div>;

    return element;
};
  
export default Layout;