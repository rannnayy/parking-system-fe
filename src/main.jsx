import React from 'react'
import ReactDOM from 'react-dom/client'
import NavigationBar from './reusables/navbar/navbar'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Router from './Router.jsx'

const theme = extendTheme({
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    choco: '#813E00',
    milo: '#AE6E4E',
    milkCoffee: '#A57A5A',
    creamChoco: '#CC9767',
    stone: '#C7AD7F',
    paleYellow: '#F5F5DD',
    cream: '#FFEBC5',
    grey: '#EDE4E0'
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <NavigationBar/>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
)
