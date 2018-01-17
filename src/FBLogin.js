import React, {Component} from 'react'
import FacebookLogin from 'react-facebook-login';
import './fblogin.css'


class FBLogin extends Component {
    constructor(props){
        super(props);
    }

    responseFacebook = (response) => {
        //console.log(response);
        this.props.cb(response)
    }

    componentClicked = (e) => {
        //e.preventDefault();
        //window.location = "https://facebook.com"

    }

    render(){
        return(this.props.show &&
            <div className="fbLoginContainer" >
                <FacebookLogin
                    appId="561289150915004"
                    /*autoLoad={true}*/
                    onClick={this.componentClicked}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    redirectUri="http://localhost:3000/"
                />
            </div>
        )
    }
}

export default FBLogin;