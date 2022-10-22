import "./register.scss"
import {useReducer} from "react";
import {useNavigate, Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../stores/auth";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);

    const [state,setState] = useReducer((prevState,newState) =>{
        return {...prevState,...newState}
    },{
        email:'',
        name:'',
        password:'',
    })

    const loginHandler = (e) => {
        e.preventDefault();
        let userObj = {
            email: 'Huseyn@gmail.com',
            name: 'Huseyn',
            surname: 'Aliyev',
            age: 30,
            password: '1234',
        }

        if (state.password === userObj.password){
            dispatch(login(userObj));

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

            <h1>Register Page</h1>
            <form className='login-form' onSubmit={loginHandler}>

                <input
                    type="text"
                    name='name'
                    value={state.name}
                    onChange={(e)=>setState({name:e.target.value})}
                    placeholder='Name'
                />

                <input
                    type="text"
                    name='email'
                    value={state.email}
                    onChange={(e)=>setState({email:e.target.value})}
                    placeholder='Email'
                />

                <input
                    type="password"
                    name='password'
                    value={state.password}
                    onChange={(e)=>setState({password:e.target.value})}
                    placeholder='password'
                />

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Register
