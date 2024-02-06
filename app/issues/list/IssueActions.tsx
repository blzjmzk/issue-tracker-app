import authOptions from "@/app/auth/AuthOptions";
import { Button, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = async () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
