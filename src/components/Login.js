import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = (props) => {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth-token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Succesfully Login", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credential", "warning")
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value }); // Update the note state with the input values
    }

    return (
        <div className="container">
            <div class="card">
                <div class="card-body">
                    <h3>Don't Worry, We Remember What You Forgot!</h3>
                </div>
            </div>

            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onchange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
