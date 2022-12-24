import React from 'react';
import {useRouter} from 'next/router';
import Stat from '../../components/Stat.js';
const Viewing = () => {
    const router = useRouter();
    const finalstatlobid = router.query.finalstatlobid;
  return (
    <div>
      <Stat id={finalstatlobid}/>
    </div>
  );
}

export default Viewing;