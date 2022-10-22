import "./login.scss"
import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate, Navigate, useLocation} from "react-router-dom";
import {login} from "../../stores/auth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginHandler = (e) => {
        e.preventDefault();
        let userObj = {
            email: 'Huseyn@gmail.com',
            name: 'Huseyn',
            surname: 'Aliyev',
            age: 30,
            password: '1234',
        }

        if (password === userObj.password){
            dispatch(login(userObj))

            let returnUrl = location.state?.return_url || '/'

            navigate(returnUrl)
        }else{
            alert('User not found');
        }
    }

    if (user){
        return <Navigate to={'/'} />
    }

    return (
        <div className="login-container">

            <h1>Login Page</h1>
            <form className='login-form' onSubmit={loginHandler}>

                <input
                    type="text"
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Email'
                />

                <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='password'
                />

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
