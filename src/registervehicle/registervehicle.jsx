import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useTheme,
  Box,
  Select
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Popup from '../reusables/popup/popup';
import { useCredStore } from '../reusables/store/store';

export default function Register() {
  const theme = useTheme();
  const [ token, setToken ] = useState("");
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");

  // For Popup
  const [ openModal, setOpenModal ] = useState(false)
  const [ modalTitle, setModalTitle ] = useState('')
  const [ modalContent, setModalContent ] = useState('')
  const [ buttonTexts, setButtonTexts ] = useState([])
  const [ buttonURLs, setButtonURLs ] = useState([])
  const [ buttonColors, setButtonColors ] = useState([])
  const [ buttonDisabled, setButtonDisabled ] = useState([])

  // useEffect(() => {
  //   const cred = useCredStore.getState();
  //   setToken(cred.token.toString());
  // }, []);

  const registerVehicle = async () => {
    fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/vehicle/register/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        plate: plate,
        type: type
      }),
    })
    .then(res => {
      if (res.status === 200) {
        setModalTitle('Registrasi Kendaraan Berhasil!')
        setModalContent('Anda dapat mendaftarkan kendaraan lain atau kembali ke halaman utama.')
        let tempTexts = ['Kembali']
        let tempURLs = ['']
        let tempColors = ['orange']
        let tempDisabled = [false]
        setButtonTexts(tempTexts)
        setButtonURLs(tempURLs)
        setButtonColors(tempColors)
        setButtonDisabled(tempDisabled)
        setOpenModal(true)
      } else {
        setModalTitle('Registrasi Kendaraan Gagal!')
        setModalContent('Anda dapat mencoba lagi.')
        let tempTexts = ['Kembali']
        let tempURLs = ['']
        let tempColors = ['orange']
        let tempDisabled = [false]
        setButtonTexts(tempTexts)
        setButtonURLs(tempURLs)
        setButtonColors(tempColors)
        setButtonDisabled(tempDisabled)
        setOpenModal(true)
      }
    })
    .catch(err => { console.log(err) });
  }

  return (
    <Flex minH={'100vh'} w={'100vw'} align={'center'} justify={'center'} overflow={"hidden"} bgColor={theme.colors.cream}>
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
        <Text fontSize={'4xl'} fontWeight={400} >Pendaftaran Kendaraan</Text>
        <Stack spacing={4}>
          <FormControl id="plate" isRequired={true}>
            <FormLabel fontWeight={300} >NOMOR PLAT KENDARAAN</FormLabel>
            <Input type="text" required borderColor={theme.colors.milo} onChange={(e) => setPlate(e.target.value)}/>
          </FormControl>
          <FormControl id="type" isRequired={true}>
            <FormLabel fontWeight={300} >TIPE KENDARAAN</FormLabel>
            <Select placeholder='Pilih salah satu' required borderColor={theme.colors.milo} onChange={(e) => setType(e.target.value)}>
              <option value={'MOTORCYCLE'}>Motor</option>
              <option value={'CAR'}>Mobil</option>
              <option value={'TRUCK'}>Truk</option>
              <option value={'BUS'}>Bus</option>
            </Select>
          </FormControl>
          <Button bg={theme.colors.milo} color={'white'} _hover={{ bg: theme.colors.cream, color:theme.colors.choco }} border={'none'} borderRadius={'20px'} onClick={() => registerVehicle()}>Daftarkan Kendaraan</Button>
        </Stack>
      </Stack>
      <Popup isOpen={openModal} setIsOpen={setOpenModal} modalTitle={modalTitle} modalContent={modalContent} buttonTexts={buttonTexts} buttonURLs={buttonURLs} buttonColors={buttonColors} buttonDisabled={buttonDisabled} />
    </Flex>
  );
}
