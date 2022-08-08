import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {useSelector,useDispatch} from 'react-redux'
import * as api from '../../store/api'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 200,
      height:300,
      // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  }));

  const itemData = [
        {
          img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg',
          title: 'images',
          author: 'author',
          featured: true,
        },
        {
            img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
            title: 'Images',
            author: 'author',
            featured: true,
          },
          {
            img: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
            title: 'Image',
            author: 'author',
            featured: true,
          },
          {
            img: 'https://previews.123rf.com/images/subinpumsom/subinpumsom1409/subinpumsom140900270/32055944-beautiful-rain-forest-at-ang-ka-nature-trail-in-doi-inthanon-national-park-thailand.jpg',
            title: 'Image',
            author: 'author',
            featured: true,
          },
        
   ];

   function ImgList1(props){
    const {posts}=useSelector((state)=>({...state.post}))
    const classes = useStyles();
    const userId=props.user._id
    const [photos,setPhotos]=useState([])
    const getData=async()=>{
      const photos=await api.getUserImages(userId)
      console.log(photos);
      setPhotos(photos.data.feeds)
      
    }
  
    useEffect(()=>{
      getData()
    },[posts])



    return (
      <div className={classes.root}>
        <ImageList rowHeight={200} gap={1} className={classes.imageList}>
          {photos.map((item,index) => (
            <ImageListItem key={index} cols={item.featured ? 2 : 1} rows={item.featured ? 2 : 1}>
              <img src={`http://localhost:5000/post-images/${item.postImage}`} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
   }
   function ImgList2(){
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <ImageList rowHeight={200} gap={1} className={classes.imageList}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.featured ? 2 : 1} rows={item.featured ? 2 : 1}>
              <img src={item.img} alt={item.title} />
              <ImageListItemBar
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton aria-label={`star ${item.title}`} className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
   }

function ImageListComponent() {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  return (
    <>
    {userRedux?<ImgList1 user={userRedux}/>:""}
    </>
  )
}

export default ImageListComponent
