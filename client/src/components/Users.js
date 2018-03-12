import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


class Users extends Component {
    render() {
        return (
            <UserIdContainer>
                    <div className="UserContainer">
                        <div clssName="frst-name">{this.props.firstName} {this.props.lastName}</div>
                        <div>{this.props.email}</div>
                        <div>
                            <img src={this.props.photoUrl} alt="user-pict" className="user-pict" />
                        </div>
                        <Link className="update" to={`/user/${this.props.id}`}>Update</Link>
                    </div>
            
            </UserIdContainer>
        )
    }
}

export default Users

const UserIdContainer = styled.div`
display:flex;
flex-direction:column;
background: rgb(105, 155, 200);
background: -moz - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
background: -webkit - gradient(radial, top left, 0px, top left, 100 %, color - stop(0 %, rgba(105, 155, 200, 1)), color - stop(57 %, rgba(181, 197, 216, 1)));
background: -webkit - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
background: -o - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
background: -ms - radial - gradient(top left, ellipse cover, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
background: radial - gradient(ellipse at top left, rgba(105, 155, 200, 1) 0 %, rgba(181, 197, 216, 1) 57 %);
filter: progid: DXImageTransform.Microsoft.gradient(startColorstr = '#699bc8', endColorstr = '#b5c5d8', GradientType = 1);
`
