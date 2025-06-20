import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
        props.showAlert("Passwords do not match", "danger");
        return;
}

        const { name, email, password } = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        //save the auth-token and redirect
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Account created succesfully", "success")
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onchange} name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onchange} name="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
