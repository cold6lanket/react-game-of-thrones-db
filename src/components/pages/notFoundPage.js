import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../app/pagenotfound.png';
class NotFoundPage extends React.Component{
    render(){
        return (
            <div style={{maxWidth: "700px", margin: "0 auto"}}>
                <img width="700" src={PageNotFound} alt="not found" />
                <p style={{textAlign:"center"}}>
                <Link style={{color: "#fff"}} to="/">Go to Home </Link>
                </p>
            </div>
        );
    }
}


export default NotFoundPage;