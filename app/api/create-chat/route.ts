import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    // Extracts 'file_key' and 'file_name' from request body
    const body = await req.json();
    const { file_key, file_name } = body;

    // Processing Logic...
    console.log(file_key, file_name);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // Success response logic...
}
