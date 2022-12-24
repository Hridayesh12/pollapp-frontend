import React from 'react';
import {useRouter} from 'next/router';
import CreateLobby from '../../components/CreateComp/CreateLobby.js';
const Creation = () => {
    const router = useRouter();
    const createid = router.query.createid;
  return (
    <div>
      <CreateLobby id={createid}/>
    </div>
  );
}

export default Creation;
