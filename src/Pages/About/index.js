import {useContext, useEffect} from "react";
import {CountryStore} from "../../Store";

export const About = () => {

    const context = useContext(CountryStore);

    useEffect(() => {
        context.setHomePage(false)
    }, [context])

    return (
        <div className="about">
            <h1>About</h1>
            <p>
                This is a simple react app that I created to learn the basics of
                React.
            </p>
        </div>
    )

}