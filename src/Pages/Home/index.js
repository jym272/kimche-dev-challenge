import {Outlet} from "react-router-dom";
import Layout from "../../Layout";

export const Home =()=>{
    // Outlet -> A component that renders the next match in a set of matches.
    return(
        <Layout>
            <Outlet/>
        </Layout>
    )
}