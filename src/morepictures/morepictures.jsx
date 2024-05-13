import { 
  Container,
  Box, 
  Flex, 
  useTheme, 
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCredStore } from '../reusables/store/store';

export default function MorePictures() {
  const theme = useTheme();
  const [ token, setToken ] = useState("");
  const [images, setImages] = useState([
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  ]);

  const fetchInfo = async() => {
    const cred = await useCredStore.getState();
    setToken(cred.token.toString());  
    if (token !== "") {
      try {
        const res = await fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/user/images", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token,
        },
      })
      const data = await res.json();
      if (res.ok) {
        setImages(data.images)
      }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchInfo();
  }, [token]);

  return(
    images.length > 0 && 
    <Container maxW={'-moz-max-content'} p={0}>
      <Center width={'100vw'} minHeight={'100vh'} bgColor={'#FFFAF0'} p={'5vh'}>
        <Flex direction={'row'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'} columnGap={'2vw'}>
          {
            images.map((image, index) => (
              <Box key={index} w='20vw' bg='white' p={'4vh'} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
                <Image src={image} objectFit={'cover'} w={'20vw'} h={'15vw'} />
              </Box>
            ))
          }
        </Flex>
      </Center>
      <Text fontSize={'md'} h={'5vh'} bgColor={theme.colors.grey} color={theme.colors.choco}>FlexPay&copy; 2024</Text>
    </Container>
  )
}