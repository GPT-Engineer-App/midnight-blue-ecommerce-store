import React, { useState } from "react";
import { Box, Heading, Text, Button, Image, Grid, useColorModeValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useToast } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Business Website",
    description: "A professional website for your business.",
    price: 999,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdlYnNpdGV8ZW58MHx8fHwxNzExOTY4MjM3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "E-commerce Store",
    description: "Start selling products online with an e-commerce website.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDB8fHx8MTcxMTk2ODIzOHww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 3,
    name: "Portfolio Website",
    description: "Showcase your work with a stunning portfolio website.",
    price: 799,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlfGVufDB8fHx8MTcxMTk2ODIzOHww&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Index = () => {
  const [user, setUser] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const isAdmin = user?.role === "admin";

  const handleLogin = () => {
    // Simulated login functionality
    setUser({ id: 1, name: "John Doe", role: "admin" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    onOpen();
  };

  const handleUpdateProduct = () => {
    // Simulated update functionality
    toast({
      title: "Product Updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box>
      <Box bg="midnight.500" py={4} px={8}>
        <Heading as="h1" color="white" size="xl">
          Website Store
        </Heading>
        <Box textAlign="right">
          {user ? (
            <>
              <Text color="white" mr={4} display="inline">
                Welcome, {user.name}!
              </Text>
              <Button onClick={handleLogout} variant="outline" colorScheme="white">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} variant="outline" colorScheme="white">
              Login
            </Button>
          )}
        </Box>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap={8} p={8}>
        {products.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" overflow="hidden" bg={useColorModeValue("white", "gray.800")}>
            <Image src={product.image} alt={product.name} />
            <Box p={6}>
              <Heading as="h3" size="lg" mb={2}>
                {product.name}
              </Heading>
              <Text mb={4}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>
                Price: ${product.price}
              </Text>
              {isAdmin && (
                <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>
              )}
              <Button colorScheme="green" mt={4}>
                Buy
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={editProduct?.name} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input value={editProduct?.description} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input value={editProduct?.price} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProduct}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
