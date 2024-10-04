import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from "@mui/material";
import nftImage1 from "src/assets/nfts/level-nft.png";
import nftImage2 from "src/assets/nfts/NFT-LevelUp.png";
import nftImage3 from "src/assets/nfts/NFT-Premium.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getNftById } from "src/store/nft/nftSlice";

const SuccsesPopup = ({ open, handleClose, nftId, nextLabUrl }) => {
  const nftSlice = useSelector((state) => state.nft);

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getNftById(nftId));
  }, [dispatch]);

  useEffect(() => {
    console.log("nftSlice", nftSlice,nftId);
  }, [nftSlice]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Success</DialogTitle>
      <DialogContent>
        <Typography variant="body1"></Typography>
        <Typography variant="body2">
          Your NFT has been successfully created!
        </Typography>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2
        }}>
        <Image
          src={nftId === 1 ? nftImage1 : nftId === 2 ? nftImage2 : nftImage3}
          width={220}
          height={220}
          style={{
            minWidth: "100% !important",
            width: "100% !important",
            height: "auto !important",
          }}
        />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="dark">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccsesPopup;
