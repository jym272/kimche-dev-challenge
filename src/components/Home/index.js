import {Outlet} from "react-router-dom";
import Layout from "../Layout";

export const Home =()=>{
    return(
        <Layout>
            <Outlet/>
        </Layout>
    )
}