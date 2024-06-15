import { 
  Container,
  Box, 
  Flex, 
  useTheme, 
  Text,
  Center,
  VStack
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

export default function Statistics() {
  const theme = useTheme();
  var date = new Date();
  var date_1 = new Date(Date.now() - 864e5);
  var date_2 = new Date(Date.now() - (2*864e5));
  var date_3 = new Date(Date.now() - (3*864e5));
  var date_4 = new Date(Date.now() - (4*864e5));
  var date_5 = new Date(Date.now() - (5*864e5));
  var date_6 = new Date(Date.now() - (6*864e5));
  const [stats, setStats] = useState({ 
    dates: [String(date_6.getDate()).padStart(2, '0')+'/'+String(date_6.getMonth() + 1).padStart(2, '0')+'/'+String(date_6.getFullYear()), String(date_5.getDate()).padStart(2, '0')+'/'+String(date_5.getMonth() + 1).padStart(2, '0')+'/'+String(date_5.getFullYear()), String(date_4.getDate()).padStart(2, '0')+'/'+String(date_4.getMonth() + 1).padStart(2, '0')+'/'+String(date_4.getFullYear()), String(date_3.getDate()).padStart(2, '0')+'/'+String(date_3.getMonth() + 1).padStart(2, '0')+'/'+String(date_3.getFullYear()), String(date_2.getDate()).padStart(2, '0')+'/'+String(date_2.getMonth() + 1).padStart(2, '0')+'/'+String(date_2.getFullYear()), String(date_1.getDate()).padStart(2, '0')+'/'+String(date_1.getMonth() + 1).padStart(2, '0')+'/'+String(date_1.getFullYear()), String(date.getDate()).padStart(2, '0')+'/'+String(date.getMonth() + 1).padStart(2, '0')+'/'+String(date.getFullYear())], 
    values: [0, 0, 0, 0, 0, 0, 0],
  });
  const [types, setTypes] = useState({ 
    percentages: [10, 20, 30, 40],
    types: ['Motor', 'Mobil', 'Truk', 'Bus'], 
  });
  const [numStation, setNumStation] = useState('500');
  const [numVehicle, setNumVehicle] = useState('100');
  const [numTransactions, setNumTransactions] = useState(0);
  const [avgDuration, setAvgDuration] = useState('30');
  const [minDuration, setMinDuration] = useState('1');
  const [maxDuration, setMaxDuration] = useState('24');

  const fetchInfo = async () => {
    var start_time = performance.now();
    try {
      const res = await fetch("https://go-parking-system-saxdgtzhza-et.a.run.app/info", {
      method: 'GET',
    })
    const data = await res.json();
    var end_time = performance.now();
    console.log(end_time - start_time);

    if (res.ok) {
      setStats(data.stats)
      setTypes(data.types)
      setNumStation(data.numStation)
      setNumVehicle(data.numVehicle)
      setNumTransactions(Math.round(data.stats.values.reduce((a, b) => a + b, 0)/7))
      setAvgDuration(data.avgDuration)
      setMinDuration(data.minDuration)
      setMaxDuration(data.maxDuration)
    }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return(
    <Container maxW={'-moz-max-content'} p={0} h={'100vh'}>
      
      <Center height={'100vh'} width={'100vw'} bgColor={'#FFFAF0'} p={0}>
        {/* Upper and Bottom Row */}
        <Flex direction={'column'} maxW={'71vw'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'center'} rowGap={'1vw'}>
          <Text fontSize={'5xl'} fontWeight={600} color={theme.colors.black} p={0}>Statistik Harian</Text>
          {/* Upper Row */}
          <Flex direction={'row'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'space-between'} columnGap={'1vw'}>
            <Box w='50vw' h='40vh' bg='white' p={4} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} h={'5vh'} color={theme.colors.black} p={0}>Jumlah Kendaraan</Text>
                <Plot
                  data={[
                    {
                      x: stats.dates,
                      y: stats.values,
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: {color: '#813E00'},
                    },
                  ]}
                  layout={{height: 170, width: 600, autosize: false, margin: {l:40, r:0, b:20, t:0, p:10}}}
                  config={{responsive: true}}
                />
              </VStack>
            </Box>
            <Box w='20vw' h='40vh' bg='white' p={4} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} h={'5vh'} color={theme.colors.black} p={0}>Statistik Harian</Text>
                <Plot
                  data={[
                    {
                      values: types.percentages,
                      labels: types.types,
                      type: 'pie',
                      marker: {color: '#813E00'},
                      hoverinfo: 'label+percent',
                      hole: .4,
                    },
                  ]}
                  layout={{height: 170, width: 200, autosize: false, margin: {l:0, r:0, b:0, t:0, p:0}, showlegend: false}}
                  config={{responsive: true}}
                />
              </VStack>
            </Box>
          </Flex>

          {/* Bottom Row */}
          <Flex direction={'row'} maxW={'71vw'} wrap={'wrap'} basis={'center'} align={'stretch'} justify={'space-between'} gap={'1vw'}>
            {/* Average Duration */}
            <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Durasi Rata-rata</Text>
                <Text fontSize={'3xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{avgDuration}</Text>
                <Text fontSize={'xs'} fontWeight={500} color={theme.colors.choco} p={0} lineHeight={1}>menit</Text>
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
                <Text fontSize={'xs'} fontWeight={500} color={theme.colors.choco} p={0} lineHeight={1}>menit</Text>
              </VStack>
            </Box>
            {/* AverageIncome (day) */}
            <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Rerata Pendapatan</Text>
                <Text fontSize={'3xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{numTransactions}</Text>
                <Text fontSize={'xs'} fontWeight={500} color={theme.colors.choco} p={0} lineHeight={1}>Rupiah</Text>
              </VStack>
            </Box>
            {/* AverageVehicles (day) */}
            <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Rerata Kendaraan</Text>
                <Text fontSize={'4xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{numVehicle}</Text>
              </VStack>
            </Box>
            {/* Number of Operating Stations (parking + toll) */}
            <Box w='10vw' h='8vw' bg='white' p={2} border={'2px'} borderColor={'#AE6E4E'} borderRadius={'15px'}>
              <VStack spacing={0}>
                <Text fontSize={'md'} fontWeight={500} color={theme.colors.black} p={0} paddingBottom={1} lineHeight={1}>Gardu Operasional</Text>
                <Text fontSize={'4xl'} fontWeight={700} color={theme.colors.choco} p={0} lineHeight={1}>{numStation}</Text>
              </VStack>
            </Box>
          </Flex>
        </Flex>

      </Center>
    </Container>
  )
}