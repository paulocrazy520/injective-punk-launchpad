import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import MintProgressChart from "../components/mintProgressChart";
import Loading from "../components/loading";
import {
  BACKGROUND_COLOR,
  BUTTON_COLOR,
  DIVIDER_COLOR,
  MINT_BALANCE_PER_NFT,
  NFT_TOKEN_ID,
  NFT_TOTAL_BALANCE,
  TREASURY_ID,
  TWITTER_URL,
} from "../config-global";

import MintOption from "../components/mintOption";
import {
  getAccountMintedCount,
  getTotalMintedCount,
  requestMint,
} from "../api/apiRequest";

export default function Launchpad() {
  const [dispImageIndex, setDispImageIndex] = useState(1);
  const [newImageIndex, setNewImageIndex] = useState(1);
  const [loadingView, setLoadingView] = useState(false);

  const [mintDlgView, setMintDlgView] = useState(false);

  const [globalMintedCount, setGlobalMintedCount] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDispImageIndex(newImageIndex); // Update dispImageIndex with previous newImageIndex
      const randomIndex = Math.floor(Math.random() * NFT_TOTAL_BALANCE) + 1;
      setNewImageIndex((prev) => {
        setDispImageIndex(prev);
        return randomIndex;
      }); // Update newImageIndex with a new random value
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getGlobalMintInfo();
  }, []);

  const getGlobalMintInfo = async () => {
    // console.log("getGlobalMintInfo log - 1");
    // setLoadingView(true);
    // const mintInfo = await getTotalMintedCount();
    // if (!mintInfo.result) {
    //   toast.error(mintInfo.error);
    //   return;
    // }
    // console.log("getGlobalMintInfo log - 2 : ", mintInfo);
    // setGlobalMintedCount(mintInfo.data);
    // setLoadingView(false);
  };

  const getAccountMintInfo = async () => {
    // if (!accountIds) {
    //   return;
    // }
    // setLoadingView(true);
    // const mintInfo = await getAccountMintedCount(accountIds[0]);
    // if (!mintInfo.result) {
    //   toast.error(mintInfo.error);
    //   return;
    // }
    // setMintedCount(mintInfo.data);
    // setLoadingView(false);
  };

  const associateToken = async () => {
    // if (!accountIds) {
    //   toast.warning("You have to connect wallet to associate token.");
    //   return;
    // }
    // setLoadingView(true);
    // let associateResult = await associateCheck(accountIds[0], NFT_TOKEN_ID);
    // if (associateResult && associateResult.associated) {
    //   setLoadingView(false);
    //   toast.success("Token already associated.");
    //   return;
    // }
    // associateResult = await tokenAssociateTransaction(NFT_TOKEN_ID);
    // if (associateResult) {
    //   toast.success("Token associated successfully.");
    // }
    // setLoadingView(false);
  };

  const onClickMint = async () => {
    // if (!accountIds) {
    //   toast.warning("You have to connect wallet to associate token.");
    //   return;
    // }
    // let associateResult = await associateCheck(accountIds[0], NFT_TOKEN_ID);
    // if (!associateResult.associated) {
    //   toast.success("You have to associate token.");
    //   return;
    // }
    // getAccountMintInfo();
    // setMintDlgView(true);
    window.open("https://injective.talis.art/", "_blank");
  };

  const mintNft = async (mintCount) => {
    toast.warning("Coming soon.");
  };

  return (
    <>
      <Container
        sx={{
          padding: { sm: "54px 24px", xs: "16px" },
        }}
      >
        <Grid container>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              padding: { sm: "0 10px", xs: "0" },
              flexDirection: "column",
              alignItems: "center",
              img: {
                width: "100%",
                maxWidth: "420px",
              },
            }}
          >
            <Box
              sx={{
                // border: "1px solid red",
                marginTop: { sm: "20px", xs: "10px" },
                marginBottom: { sm: "20px", xs: "10px" },
                ".MuiTypography-root": {
                  fontWeight: "700",
                },
              }}
            >
              <Typography
                sx={{
                  width: "fit-content",
                  backgroundColor: "white",
                  // border: "1px solid white",
                  borderRadius: "40px 0 60px 0",
                  fontSize: { sm: "90px", xs: "56px" },
                  padding: "0 20px",
                  color: `${BACKGROUND_COLOR} !important`,
                }}
              >
                Injective
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "110px", xs: "72px" },
                  color: "#ff1493 !important",
                  textShadow: "5px 3px 0 white",
                }}
              >
                Punk
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "20px", xs: "16px" },
                  fontWeight: "400 !important",
                }}
              >
                Injective Punks first OG punk project on Injective protocol.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(globalMintedCount * 100) / NFT_TOTAL_BALANCE}
                sx={{
                  width: "calc(100% - 120px)",
                  marginRight: "10px",
                }}
              />
              <Typography>
                {globalMintedCount} / {NFT_TOTAL_BALANCE}
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: { sm: "32px", xs: "16px" },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                marginBottom: { sm: "16px", xs: "8px" },
                ".MuiButton-root": {
                  width: "fit-content",
                  borderRadius: "0",
                  padding: { sm: "10px 24px", xs: "5px 16px" },
                  textTransform: "none",
                  border: `2px solid ${BUTTON_COLOR}`,
                  fontSize: { sm: "32px", xs: "18px" },
                  fontWeight: "700",
                },
              }}
            >
              <Button
                sx={{
                  color: BACKGROUND_COLOR,
                  background: BUTTON_COLOR,
                  ":hover": {
                    color: BACKGROUND_COLOR,
                    background: BUTTON_COLOR,
                  },
                }}
                onClick={onClickMint}
              >
                Mint your NFT!
              </Button>
            </Box>
            <Link href={TWITTER_URL} target="_blank">
              <IconButton
                sx={{
                  width: { sm: "52px", xs: "42px" },
                  padding: "0",
                }}
              >
                <img alt="" src="./twitter128.png" />
              </IconButton>
            </Link>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              ".MuiDivider-root": {
                margin: { sm: "20px 0", xs: "10px 0" },
                borderColor: DIVIDER_COLOR,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                marginTop: { sm: "0", xs: "20px" },
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  aspectRatio: "1",
                  border: `2px solid ${BUTTON_COLOR}`,
                  borderRadius: "20px",
                  maxWidth: "460px",
                  backgroundImage: `url(./avatar.gif)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#00a7f3",
                  overflow: "hidden",
                  img: {
                    width: "100%",
                  },
                }}
              >
                {/* <img
                  alt=""
                  src={`https://ipfs.io/ipfs/QmZ9zs8RrLSFtVapDiUXUm13z1ENbSgfuKwG6U5jDQAwHD/${newImageIndex}.png`}
                /> */}
              </Box>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "0 20px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  aspectRatio: "1",
                }}
              >
                <MintProgressChart
                  totalCount={NFT_TOTAL_BALANCE}
                  mintedCount={globalMintedCount}
                />
              </Box>
            </Box> */}
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={mintDlgView}
        onClose={() => setMintDlgView(false)}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "0",
          },
        }}
      >
        <MintOption
          onMintNft={mintNft}
          onCancel={() => setMintDlgView(false)}
          mintedCount={mintedCount}
        />
      </Dialog>
      <Backdrop open={loadingView}>
        <Loading />
      </Backdrop>
    </>
  );
}
