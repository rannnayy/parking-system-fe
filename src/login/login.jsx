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
import { useCredStore } from '../reusables/store/store';

export default function Login() {
  const theme = useTheme();
  const token = useCredStore(state => state.token);
  const setToken = useCredStore.getState().setToken;
  const [ email, setEmail ] = useState()
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

  const checkLogin = async () => {
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
        const res = await fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/auth/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pass
          }),
        })
        const data = await res.json();
        var end_time = performance.now();
        console.log(end_time - start_time);
  
        if (res.status === 200) {
          setToken(data.token)
          console.log("success:", data);
          // window.location.href = '/dashboard'
        } else {
          console.log("error:", data);
          setModalTitle('Gagal Masuk')
          setModalContent('Email atau Kata Sandi salah')
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
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  return (
    <>
      <Flex h={'90vh'} w={'100vw'} align={'center'} justify={'center'} overflow={"hidden"} bgColor={theme.colors.cream}>
        <Box
          position="absolute"
          p="auto"
          w="40vw"
          h="70vh"
          bg={theme.colors.white}
          opacity={0.5}
          bgBlendMode="multiply"
          borderRadius={'15px'}
        />
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} align={'left'} zIndex={1}>
          <Text fontSize={'4xl'} fontWeight={400} >Log in</Text>
          <Stack spacing={4}>
            <FormControl id="uname" isRequired={true}>
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
            <Button bg={theme.colors.milo} color={'white'} _hover={{ bg: theme.colors.cream, color:theme.colors.choco }} border={'none'} borderRadius={'20px'} onClick={() => checkLogin()}>Log in</Button>
            <Text>Belum punya akun? <Link href='/register' color={theme.colors.milo}>Registrasi.</Link></Text>
          </Stack>
        </Stack>
        <Popup isOpen={openModal} setIsOpen={setOpenModal} modalTitle={modalTitle} modalContent={modalContent} buttonTexts={buttonTexts} buttonURLs={buttonURLs} buttonColors={buttonColors} buttonDisabled={buttonDisabled} />
      </Flex>
    </>
  );
}
