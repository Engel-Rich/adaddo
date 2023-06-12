import React, { useEffect, useState } from 'react'
import { PhoneInputComponent } from '../Components/PhoneInput';
import { authentication } from '../firebase.config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Spin, message } from 'antd';
import LogoutOutlined from '@ant-design/icons'
// import { useEffect } from 'react';




function Login() {

    const [errorLogin, setErrorLogin] = useState('')
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        return function () {
            setLoading(false);
        }
    }, [])
    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        setLoading(true)
        const provider = new GoogleAuthProvider()
        // new firebase.auth.GoogleAuthProvider();
        provider.addScope('email')
        provider.addScope('profile');
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        authentication.languageCode = 'fr'
        // await
        signInWithPopup(authentication, provider).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            const email = authentication.currentUser.email;
            // // alert()
            // // console.log(user.email);
            message.success(`Connexion réussie ${email}`);
            // setLoading(false)
        }).catch((err) => {
            setLoading(false)
            const erreur = err.code;
            const errorMessage = err.message;
            // const credential = GoogleAuthProvider.credentialFromError(err);
            setErrorLogin(erreur + ' ' + errorMessage)
        })
    };

    const Goolgle = () => <>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg> Google
    </>
    const Loader = () => <>
        <Spin tip="Login process running...">
        </Spin>
    </>
    return (
        <div className='container p-5 d-flex justify-content-center min-vh-100 align-items-center' style={{ font: 'Exo,sans-serif' }}>
            <form >
                <div className="mb-3 mt-3 py-2 text-center d-flex justify-content-center align-items-center display-5" style={{ fontWeight: 'bold', fontSize: 30 }} >
                    Adaddo eats back-end
                </div>
                {/* <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label" style={{fontWeight:'bold', color: 'GrayText' }} >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div> */}
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label " style={{ fontWeight: 'bold', color: 'GrayText' }}>Phone</label>
                    {/* <input type="text" className="form-control " data-mdb-input-mask="+237 99-999-999" id="exampleInputPassword1" /> */}
                    <div className="form-control">
                        <PhoneInputComponent />
                    </div>
                    <div className="text-danger mt-1 " style={{ fontWeight: 'bold', color: 'GrayText' }} >{errorLogin}</div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1" style={{ fontWeight: 'bold', color: 'GrayText', borderWidth: "8px" }} >Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary form-control" style={{ fontWeight: 'bold' }}>Submit</button>
                <div className="mb-3 mt-3 d-flex align-items-center justify-content-center display-6">
                    Or
                </div>
                <button className="btn btn-outline-danger form-control" style={{ fontWeight: 'bold' }} onClick={handleGoogleSignIn} >
                    {loading ? Loader() : Goolgle()}
                </button>
            </form>
        </div>
    );
}

function SignOut() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return function () {
            setLoading(false);
        }
    }, [])

    function singOut(e) {
        e.preventDefault()
        setLoading(true)
        signOut(authentication).then((result) => {
            // setLoading(false)
            message.success('Déconnexion réussie');
        }).catch((error) => {
            setErrorLogin(error.code + " " + error.message)
            setLoading(false)
        });
    }
    const Goolgle = () => <>
        <span><LogoutOutlined /> </span> Sign Out
    </>

    const Loader = () => <>
        <Spin tip="Login process running...">
        </Spin>
    </>
    const [errorLogin, setErrorLogin] = useState('')

    return <div className='container p-5 d-flex justify-content-center  align-items-center' style={{ font: 'Exo,sans-serif', width: '100%' }}>
        <form >
            <div className="mb-3 mt-3 py-2 text-center d-flex justify-content-center align-items-center display-5" style={{ fontWeight: 'bold', fontSize: 30 }} >
                Adaddo eats back-end
            </div>
            <div className="text-danger mt-5 mb-3 " style={{ fontWeight: 'bold', color: 'GrayText' }} >{errorLogin}</div>
            <button className="btn btn-outline-danger form-control" style={{ fontWeight: 'bold' }} onClick={singOut} >
                {loading ? Loader() : Goolgle()}
            </button>


        </form>
    </div>


}

export { SignOut, Login }