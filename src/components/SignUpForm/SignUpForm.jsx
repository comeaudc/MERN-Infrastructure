import { useState } from 'react';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  });

  const disable = formData.password !== formData.confirm;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // Prevent form from being submitted to the server
    e.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      // so let's make a copy of the state object, then delete them
      const newFormData = { ...formData };
      delete newFormData.error;
      delete newFormData.confirm;
      // or
      // const {name, email, password} = formData

      const user = await signUp(newFormData);
      setUser(user);
    } catch (err) {
      // An error occurred
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
    }
  };

  return (
    <div>
      {console.log(formData)}
      <div className='form-container'>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type='password'
            name='confirm'
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type='submit' disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className='error-message'>&nbsp;{formData.error}</p>
    </div>
  );
}

// import { Component } from 'react';

// export default class SignUpForm extends Component {
//   state = {
//     name: '',
//     email: '',
//     password: '',
//     confirm: '',
//     error: '',
//   };

//   handleChange = (evt) => {
//     this.setState({
//       [evt.target.name]: evt.target.value,
//       error: '',
//     });
//   };

//   handleSubmit = async (evt) => {
//     evt.preventDefault();
//     try {
//       // We don't want to send the 'error' or 'confirm' property,
//       // so let's make a copy of the state object, then delete them
//       // const newFormData = {...this.state.formData};
//       // delete newFormData.error;
//       // delete newFormData.confirm;
//       // or
//       const { name, email, password } = formData;

//       const user = await signUp(newFormData);
//       console.log(user);
//     } catch (err) {
//       // An error occurred
//       this.setState({...this.state.formData, error: 'Sign Up Failed - Try Again' });
//     }
//   };

//   render() {
//     const disable = this.state.password !== this.state.confirm;
//     return (
//       <div>
//         <div className='form-container'>
//           <form autoComplete='off' onSubmit={this.handleSubmit}>
//             <label>Name</label>
//             <input
//               type='text'
//               name='name'
//               value={this.state.name}
//               onChange={this.handleChange}
//               required
//             />
//             <label>Email</label>
//             <input
//               type='email'
//               name='email'
//               value={this.state.email}
//               onChange={this.handleChange}
//               required
//             />
//             <label>Password</label>
//             <input
//               type='password'
//               name='password'
//               value={this.state.password}
//               onChange={this.handleChange}
//               required
//             />
//             <label>Confirm</label>
//             <input
//               type='password'
//               name='confirm'
//               value={this.state.confirm}
//               onChange={this.handleChange}
//               required
//             />
//             <button type='submit' disabled={disable}>
//               SIGN UP
//             </button>
//           </form>
//         </div>
//         <p className='error-message'>&nbsp;{this.state.error}</p>
//       </div>
//     );
//   }
// }
