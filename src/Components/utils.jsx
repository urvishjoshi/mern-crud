import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LayoutEffect = () => useLayoutEffect
const Navigate = () => useNavigate()
const Context = () => useContext()
const State = () => useState()

const auth = (arg) => JSON.parse(localStorage.getItem(arg))
const setAuth = (arg, data) => localStorage.setItem(arg, JSON.stringify(data))

export { Navigate as navigate, Context, LayoutEffect, State, auth,setAuth }
