import Header from './Container/Header';
import Container from './Container/Container';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GlobalContext } from '../App';

export default function Layout({GlobalContext}) {
  const {auth} = useContext(GlobalContext)
  const authData = auth('authData')
  const navigate = useNavigate()

  useEffect(()=>{
    if(!authData) return navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  

  return (
    <>
    { authData && 
      <>
        <Header/>
        <Container/>
      </>
    }
    </>
  );
}
    