import authOptions from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //walidacja assignedtouserid
  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  //walidacja issue
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  //aktualizacja
  const updatedIssue = await prisma?.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId, //mamy zdestrukturyzowane, więc nie trzeba powtarzać
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  //fetchujemy issue z danym id
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //jeśli nie istnieje błąd
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  //jeśli istnieje usuwamy
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  //zwracamy empty res klientowi
  return NextResponse.json({});
}
