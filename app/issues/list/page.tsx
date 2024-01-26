import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  //walidacja: uzytkownik nie moze wpisac do url zlego status
  const statuses = Object.values(Status); //wypisuje tylko mozliwe statusy w tablicy
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; //jeśli przekazemy undefined do prisma, to nie uwzględni go w filtrowaniu

  //walidacja
  //mapujemy kolumny do tablicy stringów, poniewaz nie mozemy uzyc metody includes bezpośrednio
  //za pomocą includes sprawdzamy, czy zawiera odpowiednie searchParams
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
    skip: (page - 1) * pageSize, //ile rekordów musimy skip aby wyswietlic tylko rekordy na dana strone
    take: pageSize, //ile rekordów mamy fetchowac, ten i skip daje nam ilosc rekordow na dana strone
  });
  const issueCount = await prisma.issue.count({ where: { status } }); //całkowita liczba bugów z danym statusem

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue List - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
