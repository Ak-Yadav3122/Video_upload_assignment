import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch the videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title are must be required" },
        { status: 400 }
      );
    }

    if (!body.url) {
      return NextResponse.json(
        { error: "URL are must be required" },
        { status: 400 }
      );
    }

    
    if (!body.thumbnailUrl) {
      return NextResponse.json(
        { error: "Thumbnail URL is must be required" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
        thumbnailUrl: body.thumbnailUrl,
        published: true,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create your video" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is must required" },
        { status: 400 }
      );
    }

    await prisma.video.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete your video" },
      { status: 500 }
    );
  }
}
