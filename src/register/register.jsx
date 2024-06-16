import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  InputRightElement,
  InputGroup,
  useTheme,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';
import Popup from '../reusables/popup/popup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Register() {
  const theme = useTheme();
  const [ email, setEmail ] = useState()
  const [ telp, setTelp ] = useState()
  const [ nik, setNIK ] = useState()
  const [ pass, setPass ] = useState('null')
  const [ openModal, setOpenModal ] = useState(false)
  const [ modalTitle, setModalTitle ] = useState('')
  const [ modalContent, setModalContent ] = useState('')
  const [ buttonTexts, setButtonTexts ] = useState([])
  const [ buttonURLs, setButtonURLs ] = useState([])
  const [ buttonColors, setButtonColors ] = useState([])
  const [ buttonDisabled, setButtonDisabled ] = useState([])

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassClick = () => setShowPassword(!showPassword);

  const checkLogin = async() => {
    if (email === 'null' || pass === 'null') {
      setModalTitle('Gagal Login')
      setModalContent('Isi EMAIL dan PASSWORD!')
      let tempTexts = ['Kembali']
      let tempURLs = ['']
      let tempColors = ['blue']
      let tempDisabled = [false]
      setButtonTexts(tempTexts)
      setButtonURLs(tempURLs)
      setButtonColors(tempColors)
      setButtonDisabled(tempDisabled)
      setOpenModal(true)
    } else {
      try {
        var start_time = performance.now();
        const res = await fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/auth/register/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            phone: telp,
            nik: nik
          }),
        })
        const data = await res.json();
        var end_time = performance.now();
        console.log(end_time - start_time);
    
        if (res.ok) {
          console.log("success:", data);
          window.location.href = '/login'
        } else {
          console.log("error:", data);

          setModalTitle('Gagal Masuk')
          setModalContent(data.message)
          let tempTexts = ['Coba lagi!']
          let tempURLs = ['']
          let tempColors = ['orange']
          let tempDisabled = [false]
          setButtonTexts(tempTexts)
          setButtonURLs(tempURLs)
          setButtonColors(tempColors)
          setButtonDisabled(tempDisabled)
          setOpenModal(true)
        } 
      } catch(error) {
        console.log(error)
      }
    }
  }
  
  return (
    <>
      <Flex minH={'100vh'} w={'100vw'} align={'center'} justify={'center'} overflow={"hidden"} bgColor={theme.colors.cream}>
        <Box
          position="absolute"
          p="auto"
          w="40vw"
          h="80%"
          bg={theme.colors.white}
          opacity={0.5}
          bgBlendMode="multiply"
          borderRadius={'15px'}
        />
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} align={'left'} zIndex={1}>
          <Text fontSize={'4xl'} fontWeight={400} >Register</Text>
          <Stack spacing={4}>
            <FormControl id="email" isRequired={true}>
              <FormLabel fontWeight={300} >EMAIL</FormLabel>
              <Input type="email" required borderColor={theme.colors.milo} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired={true}>
              <FormLabel fontWeight={300} >PASSWORD</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} borderColor={theme.colors.milo} onChange={(e) => setPass(e.target.value)} />
                <InputRightElement>
                  { showPassword ? <ViewIcon onClick={handleShowPassClick}/> : <ViewOffIcon onClick={handleShowPassClick} />}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="telp" isRequired={true}>
              <FormLabel fontWeight={300} >NOMOR TELEPON</FormLabel>
              <Input type="number" required borderColor={theme.colors.milo} onChange={(e) => setTelp(e.target.value)}/>
            </FormControl>
            <FormControl id="nik" isRequired={true}>
              <FormLabel fontWeight={300} >NIK</FormLabel>
              <Input type="number" required borderColor={theme.colors.milo} onChange={(e) => setNIK(e.target.value)}/>
            </FormControl>
            <Button bg={theme.colors.milo} color={'white'} _hover={{ bg: theme.colors.cream, color:theme.colors.choco }} border={'none'} borderRadius={'20px'} onClick={() => checkLogin()}>Register</Button>
            <Text>Sudah punya akun? <Link href='/login' color={theme.colors.milo}>Log in.</Link></Text>
          </Stack>
        </Stack>
        <Popup isOpen={openModal} setIsOpen={setOpenModal} modalTitle={modalTitle} modalContent={modalContent} buttonTexts={buttonTexts} buttonURLs={buttonURLs} buttonColors={buttonColors} buttonDisabled={buttonDisabled} />
      </Flex>
    </>
  );
}
