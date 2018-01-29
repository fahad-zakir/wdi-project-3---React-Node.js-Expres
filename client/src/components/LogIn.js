// import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

// class LogIn extends Component {
//     constructor() {
//         super()
//         this.state = {
//             user: {
//                 userName: '',
//                 email: '',
//                 firstName: '',
//                 lastName: ''
//             },
//             redirect: false
//         }
//     }

//     handleChange = (e) => {
//         const updatedUser = { ...this.state.user }
//         const inputField = e.target.name
//         const inputValue = e.target.value
//         updatedUser[inputField] = inputValue

//         this.setState({ user: updatedUser })
//     }

//     handeSubmit = (e) => {
//         e.preventDefault()
//         this.props.mockLogIn(this.state.user)
//         this.setState({ redirect: true })
//     }

//     render() {
//         if (this.state.redirect) {
//             return (<Redirect to="/user" />)
//         }

//         return(
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <lable htmlFor="userName">User Name</lable>
//                         <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
//                     </div>
//                     <div>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" name="email" />
//                     </div>
//                     <div>
//                         <label htmlFor="firstName">First Name</label>
//                         <input type="firstName" name="firstName" />
//                     </div>
//                     <div>
//                         <label htmlFor="lastName">Last Name</label>
//                         <input type="lastName" name="lastName" />
//                     </div>
//                     <button>Submit</button>
//                 </form>
//              </div>
//         )
//     }
// }

// export default LogIn