import React from 'react'
import "./auth.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons';


//https://codepen.io/Mohuth/pen/QWgrPvp

const Auth = () => {
    return (
        <div className='auth-page-css '>
            <div class="container container-auth-css">
                <div class="screen-auth-css">
                    <div class="screen__content">
                        <form class="login">
                            <div class="login__field">
                                <FontAwesomeIcon className='login__icon' icon={faEnvelope} />
                                <input type="text" class="login__input" placeholder="Email"/>
                            </div>
                            <div class="login__field">
                            <FontAwesomeIcon className='login__icon' icon={faLock} />
                                <input type="password" class="login__input" placeholder="Password" />
                            </div>
                            <button class="button login__submit">
                                <span class="button__text">Log In Now</span>
                                <FontAwesomeIcon className='button__icon' icon={faChevronRight} />
                            </button>
                        </form>
                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Auth