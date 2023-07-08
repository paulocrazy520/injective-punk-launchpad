import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSigningClient } from "../contexts/cosmwasm";
import { ContractAddress } from "../config";


export default function Nfts() {

  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    getBalances,
  } = useSigningClient();

  useEffect(() => {
    console.log("***********MyNftView -> connectWallet:", walletAddress, ContractAddress);

    if (!walletAddress || !ContractAddress) {
      console.log("****************No Wallet address or Contract address!!!");
      return;
    }
    if (walletAddress) {
      loadAllNfts();
    }
  }, [walletAddress])

  const loadAllNfts = async () => {
    const queryHandler = signingClient.queryClient.wasm.queryContractSmart;
    let entrypointMain = {
      get_config: {},
    };

    const responseMain = await queryHandler(ContractAddress, entrypointMain);
    console.log("*********loading query config:", responseMain);

    const cw721baseAddress = responseMain.cw721_address;

    let r = await queryHandler(cw721baseAddress, {num_tokens:{}});
    console.log("*********loading num tokens info:", r);  

    let entrypointBase = {
      all_tokens:{startAfter:"", limit:10000},
  };

    const responseBase = await queryHandler(cw721baseAddress, entrypointBase);
    console.log("*********loading all tokens:", responseBase);

    responseBase.tokens.forEach(async element => {
      let r = await queryHandler(cw721baseAddress, {nft_info:{token_id:element}});
      console.log("*********loading nft info:", r);  
    });
    


  }

  return (
    <>
      <Container
        sx={{
          padding: { sm: "24px", xs: "16px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { sm: "28px", xs: "24px" },
            fontWeight: "700",
          }}
        >
          Coming Soon!
        </Typography>
      </Container>
    </>
  );
}
