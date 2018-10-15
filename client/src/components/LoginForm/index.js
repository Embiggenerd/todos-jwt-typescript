import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { setAuthToken } from '../../utils';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSubmit(data, history) {
    if (data.token) {
      try {
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        this.setState({ email: '', password: '' });
        history.push('/home');
      } catch (e) {}
    }
  }

  handleSubmit() {
    const { history } = this.props;
    const { email, password } = this.state;

    axios
      .post('/api/users/signin', {
        email,
        password
      })
      .then(res => {
        this.onSubmit(res.data, history);
      });
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <h1 className="text-center">Enter your email and password to login!</h1>
        <input
          onChange={ev => this.handleChangeField('email', ev)}
          className="form-control my-3"
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={ev => this.handleChangeField('password', ev)}
          className="form-control my-3"
          placeholder="Password"
          value={password}
        />
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary float-right"
        >
          Submit
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   onSubmit: (data, history) => {
//     if (data.user) {
//       const token = data.token;
//       localStorage.setItem('jwtToken', token);
//       setAuthToken(token);
//       // dispatch({ type: 'USER_EMAIL', data });
//       return history.push('/home');
//     }
//     return this.setState({ error: data.error });
//   }
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(withRouter(LoginForm));
export default withRouter(LoginForm);
