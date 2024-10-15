import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as { slug: string };

  try {
    revalidatePath("/");

    revalidatePath("/projects");

    if (data?.slug) {
      revalidatePath(`/projects/${data.slug}`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.error();
  }
};
