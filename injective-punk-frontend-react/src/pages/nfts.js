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

    let config = await queryHandler(ContractAddress, {
      get_config: {},
    });
    console.log("*********loading query config:", config);

    let response = await queryHandler(config.cw721_address, { num_tokens: {} });
    console.log("*********loading num tokens info:", response);

    response = await queryHandler(config.cw721_address, {
      all_tokens: { startAfter: "", limit: 10000 },
    });
    console.log("*********loading all tokens:", response);

    response.tokens.forEach(async element => {
      let r = await queryHandler(config.cw721_address, { nft_info: { token_id: element } });
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
