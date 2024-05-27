/* eslint-disable react/prop-types */
'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useTheme,
  useBreakpointValue,
  Link
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
const Links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Vehicle Registration',
    href: '/registervehicle',
  },
]

const MenuLinks = [
  {
    label: 'Log in',
    href: '/login',
  },
  {
    label: 'Sign up',
    href: '/register',
  },
]

const NavLink = (props) => {
  const { label, children, href } = props;
  const theme = useTheme();

  return (
    <Box
      as={Link}
      href={href ?? '#'}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue(theme.colors.choco, theme.colors.cream),
        color: useColorModeValue(theme.colors.white, theme.colors.choco)
      }}>
      {children}
    </Box>
  )
}

export default function NavigationBar() {
  const { isHamburgerOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  return (
    <>
      <Box bg={useColorModeValue(theme.colors.white, theme.colors.choco)} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isHamburgerOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isHamburgerOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }} as={'a'} href='/'>
              <Image
                src='/Logo.png'
                h={'40px'}
                w={'40px'}
              />
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue(theme.colors.choco, theme.colors.cream)}
                as={'b'}>
                FlexPay
              </Text>
            </HStack>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.label} {...link}>{link.label}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {MenuLinks.map((link) => (
                <NavLink key={link.label} {...link}>{link.label}</NavLink>
              ))}
            </HStack>
            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={ '/Logo.png' }
                />
              </MenuButton>
              <MenuList>
              
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isHamburgerOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
                <NavLink key={link.label} {...link}>{link.label}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}