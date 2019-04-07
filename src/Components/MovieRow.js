import React,{Component} from 'react';
import {Link} from 'react-router-dom'

export default class MovieRow extends Component{
    constructor(props){
        super(props);
    }



    render(){
        return(
                <tr>
                    <td>
                        <Link to={"/details/"+this.props.movie.imdbID}>{this.props.movie.Title}</Link>
                    </td>
                </tr>
        )
    }


}

