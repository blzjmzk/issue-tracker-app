import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  itemCount: number; //całkowita ilosc rzeczy na wszystkich stronach
  pageSize: number; //ilosc rzeczy na 1 stonie
  currentPage: number; //aktualna strona
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  //liczymy ile jest stron w sumie na podstawie ilosci rzeczy i maksymalnej ilosci rzeczy na stronie, zaokrąglamy
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
