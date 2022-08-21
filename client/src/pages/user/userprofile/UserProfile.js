import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Feed from '../../../components/homepage/Feed'
import LeftSideBar from '../../../components/homepage/LeftSideBar'
import RightSideBarProfile from '../../../components/homepage/RightSideBarProfile'
import Navbar from '../../../components/Navbar'
import './UserProfile.css'

function UserProfile() {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  return (
    <>
      <Navbar navColor='navy'/>
      <div className='profile'>
        <LeftSideBar/>
        <div className='profileRight'>
            <div className='profileRightTop'>
            <div className='profileCover'>
            <img className='profileCoverImage' src=
            {
              userRedux?.coverpicture?
              "http://localhost:5000/cover-images/"+userRedux?.coverpicture
              :companyRedux?.coverpicture?
              "http://localhost:5000/cover-images/"+companyRedux?.coverpicture
              : 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'

            }></img>
            <img className='profileUserImage' src=
            {
              userRedux?.profilepicture?
              "http://localhost:5000/profile-images/"+userRedux?.profilepicture
              :companyRedux?.profilepicture?
              "http://localhost:5000/profile-images/"+companyRedux?.profilepicture
              :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }></img>
            </div>
            <div className='profileInfo'>
                <h4 className='profileInfoName'>{userRedux?userRedux.userName:companyRedux?.companyName}</h4>
                <span className='profileInfoDesc'>{userRedux?.desc?userRedux.desc:"Undefined"}</span>
            </div>
            </div>
            <div className='profileRightBottom'>
                <Feed/>
                <RightSideBarProfile/>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
