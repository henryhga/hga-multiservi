import { headers } from "next/headers";

export async function getNonce(): Promise<string | undefined> {
  const headerList = await headers();
  return headerList.get("x-nonce") ?? undefined;
}
