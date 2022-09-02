import { Box, Spacer, Text, Flex, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageSrollbar from "../../components/ImageScrollBar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rooms,
    rentFrequency,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" p="4" margin="auto">
    {photos && <ImageSrollbar data={photos} />}
    <Box w="full" p="6">
      <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box paddingRight="3" color="green.300">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontSize="lg" fontWeight="bold">
            AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>
        <Box>
          <Avatar size="sm" src={agency?.logo?.url} />
        </Box>
      </Flex>
      <Flex
        alignItems={"center"}
        p="1"
        justifyContent={"space-between"}
        w="250px"
        color={"blue.400"}
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
        <BsGridFill />
      </Flex>
      <Box marginTop="2">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">{title}</Text>
        <Text lineHeight="2" color="gray.600">{description}</Text>
      </Box>
      <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
            <Text>Type</Text>
            <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
        <Flex flexWrap="wrap">
            {amenities.map((item) => (
                item.amenities.map((amenity) => (
                    <Text 
                        fontSize="l"
                        fontWeight="bold"
                        color="blue.400"
                        p="2"
                        bg="gray.200"
                        m="1"
                        borderRadius="5"
                    key={amenity.text}>{amenity.text}</Text>
                ))
            ))}

        </Flex>
      </Box>
    </Box>
  </Box>
);

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}

export default PropertyDetails;
