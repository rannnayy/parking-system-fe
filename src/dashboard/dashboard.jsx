import { 
  Container,
  Box, 
  Flex, 
  useTheme, 
  Image,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Center,
  VStack,
  Divider,
  Link
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import Plot from 'react-plotly.js';
import ImagePopup from "../reusables/imagepopup/imagepopup";
import { useCredStore } from '../reusables/store/store';

export default function Dashboard() {
  const theme = useTheme();
  const [ token, setToken ] = useState("");
  const [image, setImage] = useState([
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  ]);
  var date = new Date();
  var date_1 = new Date(Date.now() - 864e5);
  var date_2 = new Date(Date.now() - (2*864e5));
  var date_3 = new Date(Date.now() - (3*864e5));
  var date_4 = new Date(Date.now() - (4*864e5));
  var date_5 = new Date(Date.now() - (5*864e5));
  var date_6 = new Date(Date.now() - (6*864e5));
  const [spending, setSpending] = useState(
    { 
      dates: [String(date_6.getDate()).padStart(2, '0')+'/'+String(date_6.getMonth() + 1).padStart(2, '0')+'/'+String(date_6.getFullYear()), String(date_5.getDate()).padStart(2, '0')+'/'+String(date_5.getMonth() + 1).padStart(2, '0')+'/'+String(date_5.getFullYear()), String(date_4.getDate()).padStart(2, '0')+'/'+String(date_4.getMonth() + 1).padStart(2, '0')+'/'+String(date_4.getFullYear()), String(date_3.getDate()).padStart(2, '0')+'/'+String(date_3.getMonth() + 1).padStart(2, '0')+'/'+String(date_3.getFullYear()), String(date_2.getDate()).padStart(2, '0')+'/'+String(date_2.getMonth() + 1).padStart(2, '0')+'/'+String(date_2.getFullYear()), String(date_1.getDate()).padStart(2, '0')+'/'+String(date_1.getMonth() + 1).padStart(2, '0')+'/'+String(date_1.getFullYear()), String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+String(date.getFullYear())], 
      money: [0, 0, 0, 0, 0, 0, 0],
    },
  );
  const [route, setRoute] = useState([
    { 
      title: 'Parking Station #1', 
      description: String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+String(date.getFullYear()),
      type: 'parking',
      img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    { 
      title: 'Toll Gate #2', 
      description: String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+String(date.getFullYear()),
      type: 'toll',
      img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    { 
      title: 'Parking Station #3', 
      description: String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+String(date.getFullYear()),
      type: 'parking',
      img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    }
  ]);
  const [timeIn, setTimeIn] = useState('15:01');
  const [timeOut, setTimeOut] = useState('16:00');
  const [minDuration, setMinDuration] = useState('1');
  const [maxDuration, setMaxDuration] = useState('24');

  // For Image Popup
  const [ openModal, setOpenModal ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState('');
  const [ modalContent, setModalContent ] = useState('');

  // const effectRan = useRef(false);

  // useEffect(() => {
  //   if (!effectRan.current) {
  //     const cred = useCredStore.getState();
  //     setToken(cred.token.toString());
      
  //     fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/", {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': token,
  //       },
  //     })
  //     .then(res => {
  //       const data = res.json();
  //       if (res.status === 200) {
  //         setImage(data.image)
  //         setSpending(data.stats)
  //         setRoute(data.route)
  //         setTimeIn(data.timeIn)
  //         setTimeOut(data.timeOut)
  //         setMinDuration(data.minDuration)
  //         setMaxDuration(data.maxDuration)
  //       }
  //     })
  //     .catch(err => { console.log(err) });
  //   }
  
  //   return () => effectRan.current = true;
  // }, [token]);

  return(
    <Container maxW={'-moz-max-content'} p={0} h={'100vh'}>
      <Center height={'95vh'} width={'100vw'} bgColor={'#FFFAF0'} p={0}>
        <Flex direction={'row'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'} columnGap={'2vw'}>
          {/* Left Pane - Image */}
          <Box w='20vw' bg='white' p={'4vh'} paddingTop={'2vh'} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
            <VStack spacing={0}>
              <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={3}>Kendaraan</Text>
              <Image src={image[0]} objectFit={'cover'} w={'20vw'} h={'15vw'}/>
              <Divider p={1} orientation='horizontal' color={'transparent'}/>
              <Image src={image[1]} objectFit={'cover'} w={'20vw'} h={'15vw'}/>
              <Link href="/morepictures">
                <Text fontSize={'xs'} fontWeight={500} color={theme.colors.black} p={0} paddingTop={2}>Gambar lainnya...</Text>
              </Link>
            </VStack>
          </Box>

          {/* Right Pane */}
          <Flex direction={'column'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'} rowGap={'1vw'}>
            {/* Graph */}
            <Flex direction={'row'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'}>
              <Box w='50vw' h='40vh' bg='white' p={4} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <VStack spacing={0}>
                  <Text fontSize={'md'} fontWeight={500} h={'5vh'} color={theme.colors.black} p={0}>Statistik Harian</Text>
                  <Plot
                    data={[
                      {
                        x: spending.dates,
                        y: spending.money,
                        type: 'bar',
                        marker: {color: '#813E00'},
                      },
                    ]}
                    layout={{height: 170, width: 600, autosize: false, margin: {l:40, r:0, b:20, t:0, p:10}}}
                    config={{responsive: true}}
                  />
                </VStack>
              </Box>
            </Flex>

            {/* Route */}
            <Flex direction={'row'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'}>
              <Box w='50vw' bg='white' p={4} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <Stepper index={route.length} colorScheme='orange'>
                  {route.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={step.type === 'parking' ? `P` : `T`}
                          incomplete={step.type === 'parking' ? `P` : `T`}
                          active={step.type === 'parking' ? `P` : `T`}
                        />
                      </StepIndicator>

                      <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                        <StepDescription>
                          <Text onClick={() => {setModalTitle('Riwayat Penggunaan '+step.description.toString()); setModalContent(step.img); setOpenModal(true)}}>Gambar</Text>
                        </StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Flex>
            <Flex direction={'row'} maxW={'50vw'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'space-between'} gap={'1vw'}>
              {/* TimeIn */}
              <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <VStack spacing={0}>
                  <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0}>Masuk</Text>
                  <Text fontSize={'4xl'} fontWeight={700} color={theme.colors.choco} p={0}>{timeIn}</Text>
                </VStack>
              </Box>
              {/* TimeOut */}
              <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <VStack spacing={0}>
                  <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0}>Keluar</Text>
                  <Text fontSize={'4xl'} fontWeight={700} color={theme.colors.choco} p={0}>{timeOut}</Text>
                </VStack>
              </Box>
              {/* MinDuration */}
              <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <VStack spacing={0}>
                  <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Durasi Minimal</Text>
                  <Text fontSize={'3xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{minDuration}</Text>
                  <Text fontSize={'xs'} fontWeight={500} color={theme.colors.choco} p={0} lineHeight={1}>menit</Text>
                </VStack>
              </Box>
              {/* MaxDuration */}
              <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <VStack spacing={0}>
                  <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Durasi Maksimal</Text>
                  <Text fontSize={'3xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{maxDuration}</Text>
                  <Text fontSize={'xs'} fontWeight={500} color={theme.colors.choco} p={0} lineHeight={1}>jam</Text>
                </VStack>
              </Box>
            </Flex>
          </Flex>
          
        </Flex>
      </Center>
      <Text fontSize={'md'} h={'5vh'} bgColor={theme.colors.grey} color={theme.colors.choco}>FlexPay&copy; 2024</Text>
      <ImagePopup isOpen={openModal} setIsOpen={setOpenModal} modalTitle={modalTitle} modalContent={modalContent} />
    </Container>
  )
}