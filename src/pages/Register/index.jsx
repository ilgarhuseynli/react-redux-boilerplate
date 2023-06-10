import {useReducer} from "react";
import {useNavigate, Navigate, useLocation, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {url} from "../../library/utils";
import {authRegister} from "../../actions";
import Swal from "sweetalert2";

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector(state => state.auth);

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, {
        email: '',
        name: '',
        password: '',
        termsConfirmed:false,
        showPassword:false,
        showPasswordConfirm:false,
    })

    const loginHandler = async (e) => {
        e.preventDefault();

        if (!state.termsConfirmed){
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Terms and condition not confirmed !!',
            })

            return;
        }

        let response = await authRegister(state)

        if (response.data.status === 'success'){
            let resData = response.data;

            let returnUrl = location.state?.return_url || '/'

            navigate(returnUrl)
        }
    }

    if (user) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="card-body p-4">

            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">Free Sign Up</h4>
                <p className="text-muted mb-4">Don't have an account? Create your account, it takes less than a
                    minute </p>
            </div>

            <form onSubmit={loginHandler}>

                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                        onChange={e=>setState({name:e.target.value})}
                        className="form-control"
                        type="text"
                        id="fullname"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="emailaddress" className="form-label">Email address</label>
                    <input
                        onChange={e=>setState({email:e.target.value})}
                        className="form-control" type="email" id="emailaddress" required
                           placeholder="Enter your email"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group input-group-merge">
                        <input
                            className="form-control"
                            type={state.showPassword ? 'text' : 'password'}
                            id="password"
                            required
                            value={state.password}
                            onChange={e=>setState({password:e.target.value})}
                            placeholder='Enter your password'
                        />
                        <div className={`input-group-text  ${state.showPassword ? 'show-password' : ''}`}
                             onClick={() => setState({showPassword:!state.showPassword})} data-password="false">
                            <span className="password-eye"/>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Password confirmation</label>
                    <div className="input-group input-group-merge">
                        <input
                            className="form-control"
                            type={state.showPasswordConfirm ? 'text' : 'password'}
                            id="password"
                            required
                            value={state.password_confirmation}
                            onChange={e=>setState({password_confirmation:e.target.value})}
                            placeholder='Enter your password'
                        />
                        <div className={`input-group-text  ${state.showPasswordConfirm ? 'show-password' : ''}`}
                             onClick={() => setState({showPasswordConfirm:!state.showPasswordConfirm})} data-password="false">
                            <span className="password-eye"/>
                        </div>
                    </div>
                </div>



                <div className="mb-3">
                    <div className="form-check">
                        <input
                            onClick={()=>setState({termsConfirmed: !state.termsConfirmed})}
                            value={state.termsConfirmed}
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox-signup"
                        />
                        <label className="form-check-label" htmlFor="checkbox-signup">
                            I accept <a href="#" className="text-muted">Terms and Conditions</a>
                        </label>
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <button className="btn btn-primary" type="submit"> Sign Up</button>
                </div>

            </form>


            <div className="row mt-3">
                <div className="col-12 text-center">
                    <p className="text-muted">Already have account?
                        <Link to={url('auth.login')} className="text-muted ms-1"><b>Log In</b></Link>
                    </p>
                </div>
            </div>

        </div>

    )
}

export default Index
