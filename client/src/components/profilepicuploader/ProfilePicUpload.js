import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { vendorTockenValidator } from '../../store/features/authSlice';
import * as api from '../../store/api'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200, 
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));
  
  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });
  
  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    borderRadius: "50%"
  }));
  
  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
    borderRadius: "50%"
  }));
  
  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
    borderRadius: "50%"
  }));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  function ProfilePicUpload() {
    const { loading, userRedux, companyRedux, adminRedux, error } = useSelector(
        (state) => ({ ...state.auth })
      );
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleSubmit = async () => {

        //  const formData=new FormData()
        //  formData.append("creatorId","props.editdata._id")
        //  formData.append("post","editPost")
        const formData = {

        };
        const vendorId = companyRedux?._id;
        await api
          .updateVendor(vendorId, formData)
          .then((data) => {
            const vendorTocken = JSON.parse(localStorage.getItem("vendorTocken"));
            dispatch(vendorTockenValidator({ vendorTocken }));
            handleClose();
            alert("Updated Successfully");
          })
          .catch((err) => {
            console.log(err);
          });
   
    };
  
    const handleDelete = () => {
      handleClose();
    };
  
    return (
      <div>
        <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                minWidth: 300,
                onclick:{handleOpen},
                borderRadius: "50%"
              }}
            >
              {
                <ImageButton
                  focusRipple
                  style={{
                    width: 200,
                    borderRadius: "50%"
                  }}
                >
                  
                  <ImageSrc
                    style={{
                      backgroundImage: `url(
            ${
              companyRedux?.profilepicture
                ? "http://localhost:5000/profile-images/" +
                  companyRedux?.profilepicture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            })`,
                      borderRadius: "50%",
                    }}
                  />
                  <ImageBackdrop className="MuiImageBackdrop-root" sx={{borderRadius: "50%"}}/>
                  <Image sx={{ borderRadius: "50%"}}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: "relative",
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      Edit
                      <ImageMarked className="MuiImageMarked-root"/>
                    </Typography>
                  </Image>
                </ImageButton>
              }
            </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                
                sx={{ m: 2 }}
                fullWidth
              />
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }



export default ProfilePicUpload
