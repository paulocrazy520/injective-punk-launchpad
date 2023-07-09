import React, { useState, useEffect } from "react";
import { Backdrop, Box, Container, Grid, Typography } from "@mui/material";
import { useSigningClient } from "../contexts/cosmwasm";
import { ContractAddress } from "../config";
import { getNftInfo } from "../api/mirrorApiRequest";
import Loading from "../components/loading";

export default function Nfts() {
  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    getBalances,
  } = useSigningClient();

  const [loadingView, setLoadingView] = useState(false);
  const [nftInfo, setNftInfo] = useState([]);
  const [nftCount, setNftCount] = useState(0);

  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setIsBottom(true);
        loadMoreNfts();
      } else {
        setIsBottom(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nftInfo]);

  useEffect(() => {
    console.log(
      "***********MyNftView -> connectWallet:",
      walletAddress,
      ContractAddress
    );

    if (!walletAddress || !ContractAddress) {
      console.log("****************No Wallet address or Contract address!!!");
      return;
    }
    if (walletAddress) {
      loadAllNfts();
    }
  }, [walletAddress]);

  const loadAllNfts = async () => {
    setLoadingView(true);
    const queryHandler = signingClient.queryClient.wasm.queryContractSmart;

    let config = await queryHandler(ContractAddress, {
      get_config: {},
    });
    // console.log("*********loading query config:", config);

    let response = await queryHandler(config.cw721_address, { num_tokens: {} });
    // console.log("*********loading num tokens info:", response);

    setNftCount(response.count);

    response = await queryHandler(config.cw721_address, {
      all_tokens: { start_after: "", limit: 30 },
    });
    // let lastToken = response.tokens[response.tokens.length - 1];
    // console.log("*********loading all tokens1:", response, lastToken);

    let newNftInfo = [];
    for (let i = 0; i < response.tokens.length; i++) {
      // let r = await queryHandler(config.cw721_address, {
      //   all_nft_info: { token_id: 0 },
      // });
      // console.log("*********loading nft info:", r);

      let info = await getNftInfo("", parseInt(response.tokens[i]) + 1);
      if (info.result)
        newNftInfo.push({ ...info.data, tokenId: response.tokens[i] });
    }
    console.log("loadAllNfts log - 1 : ", newNftInfo);
    setNftInfo(newNftInfo);
    setLoadingView(false);
  };

  const loadMoreNfts = async () => {
    let newNftInfo = JSON.parse(JSON.stringify(nftInfo));
    console.log("loadMoreNfts log - 0 : ", newNftInfo);

    if (!newNftInfo[newNftInfo.length - 1]) return;

    setLoadingView(true);
    let lastTokenId = newNftInfo[newNftInfo.length - 1].tokenId;

    console.log("loadMoreNfts log - 1 : ", lastTokenId);
    const queryHandler = signingClient.queryClient.wasm.queryContractSmart;
    let config = await queryHandler(ContractAddress, {
      get_config: {},
    });
    let newTokenInfo = await queryHandler(config.cw721_address, {
      all_tokens: { start_after: lastTokenId, limit: 30 },
    });

    for (let i = 0; i < newTokenInfo.tokens.length; i++) {
      let info = await getNftInfo("", parseInt(newTokenInfo.tokens[i]) + 1);
      if (info.result)
        newNftInfo.push({ ...info.data, tokenId: newTokenInfo.tokens[i] });
    }
    console.log("loadMoreNfts log - 2 : ", newNftInfo);
    setNftInfo(newNftInfo);
    setLoadingView(false);
  };

  return (
    <>
      <Container
        sx={{
          padding: { sm: "24px", xs: "16px" },
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            textAlign: "end",
            marginBottom: "10px",
          }}
        >
          {nftCount} NFTs
        </Typography>
        <Grid container spacing={2}>
          {nftInfo?.length > 0 &&
            nftInfo.map((item) => (
              <Grid item md={3} sm={4} xs={6}>
                <Box
                  sx={{
                    width: "100%",
                    border: "2px solid #a0b0c0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    img: {
                      width: "100%",
                    },
                  }}
                >
                  <img alt="" src={item.imageUrl} />
                  <Box
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      background: "#a0b0c0",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#101520 !important",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Backdrop open={loadingView}>
        <Loading />
      </Backdrop>
    </>
  );
}
