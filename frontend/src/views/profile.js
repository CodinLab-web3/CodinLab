import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileUser } from "src/store/user/userSlice";
import { useRouter } from "next/router";

const Profile = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setNfts([
      { id: 1, title: "NFT #1", description: "Earned for completing 10 Labs" },
      { id: 2, title: "NFT #2", description: "Earned for mastering Go" },
      { id: 3, title: "NFT #3", description: "Earned for finishing Level 3" },
    ]);
  }, []);



    const [info, setInfo] = useState({});

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchProfileUser())
    }, [dispatch])

    const { user: stateUser } = useSelector((state) => state);

    useEffect(() => {
        if (stateUser.data) {
            setInfo(stateUser.data)
        }
    }, [stateUser.data])

    console.log(info)
   


  return (
    <Box p={3} display="flex" justifyContent="space-between">
      <Card sx={{ width: "30%", height: "100%",  }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={"/path-to-avatar.png"}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Divider sx={{ width: "100%", my: 2 }} />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              justifyContent="center"
              width="100%"
            >
              
              <Typography variant="h6"><i>Name: </i> <b>{info.data?.name}</b></Typography>
              <Typography variant="body1">Surname: <b>{info.data?.surname} </b> </Typography>
              <Typography variant="body1">Username: <b>{info.data?.name}</b></Typography>
              <Typography variant="body1">GitHub: <b>{info.data?.githubProfile}</b></Typography>
              <Typography variant="body1">Best Language: <b>{info.data?.bestLanguage}</b></Typography>
              <Typography variant="body1">Role: <b>{info.data?.role}</b></Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="start" mt={3}>
            <Button variant="dark" color="primary"
              onClick={() => {
                router.push("/settings");
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ width: "65%" }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">NFTs Earned</Typography>
              <List>
                {nfts.map((nft) => (
                  <React.Fragment key={nft.id}>
                    <ListItem>
                      <ListItemText
                        primary={nft.title}
                        secondary={nft.description}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
