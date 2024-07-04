"use server";

import { revalidateTag } from "next/cache";

export const revalidate = (tag) => {
  revalidateTag(tag);
};
