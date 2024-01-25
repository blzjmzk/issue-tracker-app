"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number; //całkowita ilosc rzeczy na wszystkich stronach
  pageSize: number; //ilosc rzeczy na 1 stonie
  currentPage: number; //aktualna strona
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter(); //do aktualizacji url
  const searchParams = useSearchParams(); //by miec dostęp do aktualnych query parameters, wyk w celu pozostawiania aktualnych query parameters jak filter, sort
  const changePage = (page: number) => {
    //funkcja do aktualizacji aktualnej strony w query string
    const params = new URLSearchParams(searchParams); //aktualne parametry
    params.set("page", page.toString()); //mamy number więc toString, ustalamy key page na aktualną page
    router.push("?" + params.toString()); //aktualizujemy tylko query string a nie endpoint
  };
  //liczymy ile jest stron w sumie na podstawie ilosci rzeczy i maksymalnej ilosci rzeczy na stronie, zaokrąglamy
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
