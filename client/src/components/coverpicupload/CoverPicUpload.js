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
  }));
  
  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
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
  
  function CoverPicUpload() {
    const { loading, userRedux, companyRedux, adminRedux, error } = useSelector(
        (state) => ({ ...state.auth })
      );
    const [open1, setOpen1] = useState(false);
    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //   setCompanyName(company?.companyName);
    //   setDescription(company?.desc);
    //   setCity(company?.city);
    //   setFrom(company?.from);
    // }, [company]);
  
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
                width: "100%",
                
              }}
            >
              {
                <ImageButton
                  focusRipple
                  style={{
                    width: "100%",
                    
                  }}
                >
                  <ImageSrc
                    style={{
                      backgroundImage: `url(
            ${
              companyRedux?.coverpicture
                ? "http://localhost:5000/cover-images/" +
                  companyRedux?.coverpicture
                : "https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
            })`,
                    }}
                  />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: "relative",
                        p: 4,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      Edit
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              }
            </Box>
        <Modal
          open={open1}
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

            <Box sx={{ display: "flex", margin: 2 }} gap={2}>
              <Button
                variant="contained"
                component="label"
                sx={{ maxHeight: 40 }}
                color="success"
              >
                Update
              </Button>
              <Button
                variant="contained"
                component="label"
                sx={{ maxHeight: 40 }}
                onClick={handleClose}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }



export default CoverPicUpload
