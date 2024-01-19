"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialogTrigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialogDescription>
        <Flex mt="4" gap="3">
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button color="red">Delete Issue</Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
