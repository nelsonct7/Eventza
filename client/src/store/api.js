import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:5000'},{headers:{"Content-Type": "multipart/form-data"}});

export const logIn=(formData)=>API.post('/user/login',{...formData})
export const signUp=(formData)=>API.post('/user/signup',{...formData})
export const userTockenValid=(userTocken)=>API.post('user/tockenValidator',{userTocken})
export const getUserById=(userId)=>API.get('/user/getUserById/'+userId)
export const getMessagesByConversationId=(conversationId)=>API.get('/message/'+conversationId)
export const setMessage=(message)=>API.post('/message',{...message})
export const getAllUserList=()=>API.get('/user/getAllUsers') 
export const updatePic=(formData1,userId)=>API.put('/user/uploadimages/'+userId,formData1)
export const followUser=(id,userId)=>API.put('/user/follow/'+id,{userId})
export const unFollowUser=(id,userId)=>API.put('/user/unfollow/'+id,{userId})
export const updateUser=(userId,formData)=>API.put('/user/updateuser/'+userId,{...formData})
export const updateUserProfilePic=(userId,formData)=>API.put('/user/updateprofilepic/'+userId,formData)
export const updateUserCoverPic=(userId,formData)=>API.put('/user/updatecoverpic/'+userId,formData)



export const adminLogIn=(formData)=>API.post('/admin/login',{...formData})
export const adminTockenValid=(adminTocken)=>API.post('/admin/tockenvalidator',{adminTocken})

export const vendorLogIn=(formData)=>API.post('/vendor/login',{...formData})
export const vendorSignUp=(formData)=>API.post('/vendor/signup',{...formData})
export const vendorTockenValid=(vendorTocken)=>API.post('/vendor/tockenvalidator',{vendorTocken})
export const updateVendorPic=(formData1,vendorId)=>API.put('/vendor/uploadimages/'+vendorId,formData1)
export const getVendorById=(vendorId)=>API.get('/vendor/getVendorById/'+vendorId)
export const getAllVendors=()=>API.get('/vendor/getallvendors')
export const updateVendor=(vendorId,formData)=>API.put('/vendor/updatedetails/'+vendorId,{...formData})
export const updateVendorProfilePic=(vendorId,formData)=>API.put('/vendor/updateprofilepic/'+vendorId,formData)
export const updateVendorCoverPic=(vendorId,formData)=>API.put('/vendor/updatecoverpic/'+vendorId,formData)
export const addEvent=(formData)=>API.post('/vendor/addevent',formData)
export const deleteEvent=(eventId)=>API.delete('/vendor/deleteevent/'+eventId)
export const updateEvent=(eventId)=>API.put('/vendor/updateevent/'+eventId)
export const getEventById=(eventId)=>API.get('/vendor/geteventbyid/'+eventId)
export const getEventByVendorId=(vendorId)=>API.get('/vendor/geteventbyvendorid/'+vendorId)
export const getAllEvents=()=>API.get('/vendor/getallevents')

export const viewUserListAdmin=()=>API.get('/admin/userlist')
export const adminDeleteUser=(userId)=>API.delete('/admin/deleteuser/'+userId)
export const changeStatusUser=(userId,status)=>API.patch('/admin/changestatus/'+userId+'/'+status)

export const viewManagerListAdmin=()=>API.get('/admin/managerlist')
export const adminDeleteManager=(userId)=>API.delete('/admin/deleteuser/'+userId)
export const changeStatusManager=(userId,status)=>API.patch('/admin/changestatus/'+userId+'/'+status)

export const viewCompanyListAdmin=()=>API.get('/admin/vendorlist')
export const adminDeleteCompany=(companyId)=>API.delete('/admin/deletevendor/'+companyId)
export const changeStatusCompany=(companyId,status)=>API.patch('/admin/changevendorstatus/'+companyId+'/'+status)

export const createPost=(formData)=>API.post('/post/createpost/',formData)
export const getPost=()=>API.get('/post/getpost')
export const getPostbyId=(userId)=>API.get('/post/getpostbyid/'+userId)
export const getAdminPost=()=>API.get('/post/getadminpost')
export const editPost=(formData,postId)=>API.patch('/post/editpost/'+postId,formData)
export const deletePost=(postId)=>API.delete('/post/deletepost/'+postId)
export const changeStatus=(postId,stat)=>API.patch('/post/changeStatus/'+postId+"/"+stat)
export const getUserImages=(userId)=>API.get('/post/getpostimages/'+userId)
export const likePost=(id,userId)=>API.put('/post/like/'+id,{userId})

export const getConversations=(userId)=>API.get('/conversation/'+userId)
export const getConversationsByIds=(firstUserId,secondUserId)=>API.get('/conversation/find/'+firstUserId+"/"+secondUserId)

//,{headers:{"Content-Type": "multipart/form-data"}}
