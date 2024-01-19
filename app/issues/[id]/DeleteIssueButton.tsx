"use client";
import { Spinner } from "@/app/components";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh(); //przeciwdziałamy cachingowi
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialogTrigger>
          <Button
            color="red"
            disabled={isDeleting}
            style={{
              cursor: "pointer",
            }}
          >
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialogDescription>
          <Flex mt="4" gap="3">
            <AlertDialogCancel>
              <Button
                variant="soft"
                color="gray"
                style={{
                  cursor: "pointer",
                }}
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button
                style={{
                  cursor: "pointer",
                }}
                color="red"
                onClick={deleteIssue}
              >
                Delete Issue
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            value="soft"
            mt="2"
            onClick={() => setError(false)}
            style={{
              cursor: "pointer",
            }}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
