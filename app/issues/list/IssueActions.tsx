import authOptions from "@/app/auth/AuthOptions";
import { Button, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Flex justify="between">
      <IssueStatusFilter />
      {session && (
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      )}
    </Flex>
  );
};

export default IssueActions;
