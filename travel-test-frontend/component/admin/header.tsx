import Head from "next/head";
import Link from "next/link";
import React from "react";
import Container from '@mui/material/Container';
const Header = ({ title, description }: {
  title: string,
  description: string
}) => {
  return (
    <>
      <Container>
        <Head>
          <meta name="description" content={description} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>{title}</title>
        </Head>
      </Container>
    </>
  );
};
export default Header;
