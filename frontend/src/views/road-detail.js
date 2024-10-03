import { useTheme } from "@mui/material/styles";
import CustomBreadcrumbs from "src/components/breadcrumbs";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Box, Button, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import LockIcon from "src/assets/icons/padlock.png"
import PathIcon from "src/assets/icons/icons8-path-100.png"
import DoneIcon from "src/assets/icons/icons8-done-100 (1).png"
import NextPathIcon from "src/assets/icons/icons8-signpost-100.png"
import Image from "next/image";
import { CircularProgressStatistics } from "src/components/progress/CircularProgressStatistics";
import { useEffect, useState } from "react";
import LinearProgess from "src/components/progress/LinearProgess";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaths, startRoad } from "src/store/paths/pathsSlice";
import { getProgrammingId } from "src/data/programmingIds";
<<<<<<< HEAD
=======
import { set } from "nprogress";
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75


const RoadDetails = ({ language = "" }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
  const dispatch = useDispatch();
  const { paths } = useSelector((state) => state);

  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching the paths
  const [error, setError] = useState(null); // Error state for fetching the paths

  const [programmingId, setProgrammingId] = useState(null);

  const [pathsDataContent, setPathsDataContent] = useState([]);
<<<<<<< HEAD
  const [isStarted, setIsStarted] = useState(false); // Set this to true if the user has started the road on useEffect()
  const [amountOfInProgressPaths, setAmountOfInProgressPaths] = useState(0); // Amount of in progress paths
  const [amountOfCompletedPaths, setAmountOfCompletedPaths] = useState(0); // Amount of completed paths // Path icon path
  const [programmingIcon, setProgrammingIcon] = useState("images/c.png"); // Programming icon path
=======
  const [pathIsStarted, setpathIsStarted] = useState(false); // Set this to true if the user has started the road on useEffect()
  const [amountOfInProgressPaths, setAmountOfInProgressPaths] = useState(0); // Amount of in progress paths
  const [amountOfCompletedPaths, setAmountOfCompletedPaths] = useState(0); // Amount of completed paths // Path icon path
  const [programmingIcon, setProgrammingIcon] = useState("images/c.png"); // Programming icon path
  const [title, setTitle] = useState(""); // Road title
  const [description, setDescription] = useState(""); // Road description
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75

  const handleStartRoad = () => {
    // Redirect to the first path of the road
    dispatch(startRoad({ programmingid: programmingId }));
    router.push(`/roads/${language}/1`);
  };

  const renderPathIcon = (path) => {
<<<<<<< HEAD
    if (path.isFinished) {
      return DoneIcon;
    } else if (path.isStarted && !path.isFinished) {
=======
    if (path.pathIsFinished) {
      return DoneIcon;
    } else if (path.pathIsStarted && !path.pathIsFinished) {
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
      return NextPathIcon;
    } else {
      return LockIcon;
    }
  };

  useEffect(() => {
    setProgrammingId(getProgrammingId[language]);
  }, [language]);

  useEffect(() => {
    // Fetch the paths of the road
    if (programmingId) {
      dispatch(
        fetchPaths({ programmingid: programmingId, language: i18n.language })
      );
    }
  }, [programmingId, i18n.language]);

  useEffect(() => {
    if (paths) {
      setIsLoading(paths.loading);
      setError(paths.error);

      if (paths.data.paths) {
        setProgrammingIcon(paths.data.iconPath);

<<<<<<< HEAD
=======
        setTitle(paths.data.name);
        setDescription(paths.data.description);

>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
        const pathsData = paths.data.paths;


        // Amount of completed paths
<<<<<<< HEAD
        const completedPaths = pathsData.filter((path) => path.isFinished);

        // Amount of in progress paths
        const inProgressPaths = pathsData.filter(
          (path) => !path.isFinished && path.isStarted
        );

        if (inProgressPaths.length > 0 || completedPaths.length > 0) {
          setIsStarted(true);
=======
        const completedPaths = pathsData.filter((path) => path.pathIsFinished);

        // Amount of in progress paths
        const inProgressPaths = pathsData.filter(
          (path) => !path.pathIsFinished && path.pathIsFinished
        );

        if (inProgressPaths.length > 0 || completedPaths.length > 0) {
          setpathIsStarted(true);
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
        }

        setAmountOfInProgressPaths(inProgressPaths.length);
        setAmountOfCompletedPaths(completedPaths.length);
        setPathsDataContent(pathsData);
      }
    }
  }, [paths, i18next.language]);

  // Breadcrumbs
  const breadcrums = [
    {
      path: "/roads",
      title: t("home.roads.title"),
      permission: "roads",
    },
    {
      path: `/roads/${language}`,
      title: capitalizedLanguage,
      permission: "roads",
    },
  ];

  const progresses = [
    {
      name: "In progress", // String
      // value: stateStatistics.data?.data?.progress, // Number
      value: amountOfInProgressPaths,
      color: "#8FDDFD", // String
    },
    {
      name: "Completed", // String
      // value: stateStatistics.data?.data?.completed, // Number
      value: amountOfCompletedPaths,
      color: "#0A3B7A", // String
    },
  ];

  // TODO: Get the title and description from front-end side
<<<<<<< HEAD
  const title = "What is /C/?";
  const description =
    "/C/ is a programming language created by Dennis Ritchie at Bell Laboratories in 1972. It is a popular language due to its foundational nature and close association with UNIX.";
=======
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75

  return (
    <Box>
      {/* Breadcrumbs */}
      <CustomBreadcrumbs titles={breadcrums} />

      {/* Header Cards */}
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Road Description and button */}
          <Grid item xs={12} sm={6} md={8}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 3,
                  p: 4,
                }}
              >
                <Image
                  src={`/${programmingIcon}`}
                  alt="C Icon"
                  width={80}
                  height={80}
                />
<<<<<<< HEAD
                {!isStarted ? (
=======
                {!pathIsStarted ? (
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
                  <>
                    <Box>
                      <Typography variant="h4" fontWeight={600}>
                        {title}
                      </Typography>
                      <Typography variant="body1">{description}</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#fff",
                        color: theme.palette.primary.dark,
                        fontWeight: 600,
                        maxWidth: "9.37rem",
                        maxHeight: "3.12rem",
                        minWidth: "9.37rem",
                        minHeight: "3.12rem",
                        ":hover": {
                          bgcolor: theme.palette.primary.light,
                        },
                      }}
                      onClick={handleStartRoad}
                    >
                      {" "}
                      {t("roads.path.start_road")}{" "}
                    </Button>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h4">
                      {" "}
                      {capitalizedLanguage}{" "}
                    </Typography>
                    <LinearProgess progress={amountOfCompletedPaths} />
                    <Stack direction={"row"} spacing={1}>
                      <Image
                        src={PathIcon}
                        alt="Path Icon"
                        width={25}
                        height={25}
                      />
                      <Typography variant="body1">
                        {amountOfCompletedPaths}/100 Path
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Circular Progresses */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <CircularProgressStatistics progresses={progresses} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

<<<<<<< HEAD
      {/* Road Paths */}
=======
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
      {pathsDataContent.map((path, index) => (
        <Box key={index}>
          <Box
            sx={{
              borderWidth: 6,
<<<<<<< HEAD
              borderColor: path.isFinished
=======
              borderColor: path.pathIsFinished
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
                ? "#39CE19"
                : theme.palette.primary.dark,
              borderStyle:
                index % 2 === 0
                  ? "none none dashed dashed"
                  : "none dashed dashed none",
              p: 3,
            }}
          >
            <Box
              onClick={() => router.push(`/roads/${language}/${path.id}`)}
              sx={{
                mt: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
<<<<<<< HEAD
                border: path.isFinished ? "3px solid #39CE19" : "none",
                borderRadius: 6,
                backgroundColor: path.isFinished
=======
                border: path.pathIsFinished ? "3px solid #39CE19" : "none",
                borderRadius: 6,
                backgroundColor: path.pathIsFinished
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
                  ? "#fff"
                  : theme.palette.primary.dark,
                p: 3,
              }}
            >
              <Image
                src={renderPathIcon(path)}
                alt="Done Icon"
                width={30}
                height={30}
              />

              <Typography
                variant="body1"
                fontWeight={600}
<<<<<<< HEAD
                color={!path.isFinished ? "#fff" : "#0A3B7A"}
              >
                {" "}
                {path.languages.title}:{" "}
              </Typography>
              <Typography
                variant="body1"
                color={!path.isFinished ? "#fff" : "#0A3B7A"}
              >
                {" "}
                {path.languages.description}
=======
                color={!path.pathIsFinished ? "#fff" : "#0A3B7A"}
              >
               
                {path.language.title}:
              </Typography>
              <Typography
                variant="body1"
                color={!path.pathIsFinished ? "#fff" : "#0A3B7A"}
              >
               
                {path.language.description}
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default RoadDetails;