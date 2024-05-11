import { 
  Container,
  Box, 
  Flex, 
  useTheme, 
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useCredStore } from '../reusables/store/store';

export default function MorePictures() {
  const theme = useTheme();
  const [ token, setToken ] = useState("");
  const [images, setImages] = useState([
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfCSUcQjv9wwaMyA_xU_dlzgESwCnzURwnomksTgSVw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfCSUcQjv9wwaMyA_xU_dlzgESwCnzURwnomksTgSVw&s",
  ]);

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
  //         setImages(data.images)
  //       }
  //     })
  //     .catch(err => { console.log(err) });
  //   }
  
  //   return () => effectRan.current = true;
  // }, [token]);
  
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