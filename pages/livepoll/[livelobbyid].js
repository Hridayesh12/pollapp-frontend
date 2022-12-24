import React, { useEffect } from 'react';
import LiveLobby from '../../components/LiveLobComp/LiveLobby.js';

import {useRouter} from 'next/router.js';
const LiveLob = () => {
  const router = useRouter();
  const livelobbyid = router.query.livelobbyid;
  return (
    <div>
    <LiveLobby id={livelobbyid}/>
  </div>
  );
}

export default LiveLob;
