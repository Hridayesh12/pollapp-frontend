import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import {useRouter} from 'next/router';
import PollVote from "../../components/LiveLobbyComp/PollVote.js";
export default function Vote() {
    const router = useRouter();
    const voteindex = router.query.voteindex;
  return (
    <>
    <PollVote id={voteindex}/>
    </>
  )
}
