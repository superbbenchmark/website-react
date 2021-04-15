import React from 'react';
import {
  useParams,
} from 'react-router-dom';


export default function SubmitForm(props) {
  const { urlTrack } = useParams();
  return (
    <React.Fragment>
      <h1>
        {urlTrack}
      </h1>
    </React.Fragment>      
  )
};
