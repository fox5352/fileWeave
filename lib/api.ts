import { useSessionStore } from "@/store/session";

export async function getFolders(url: string): Promise<[any, string | null]> {
  const res = await fetch(`${url}`, { method: "GET" });

  if (!res.ok) {
    return [null, "failed to get folders"];
  }

  const data = await res.json();

  if (!data?.data) {
    return [null, "failed to get folders"];
  }

  return [data.data, null];
}

export type AudioMetaData = {
  duration: number;
  sampleRate: number;
};

export type ImageMetaData = {
  thumbnail: {
    data: number[];
    type: string;
  };
};

export type FileBlock = {
  name: string;
  path: string;
  extension: string;
  type: string;
  metadata: {
    size: number;
    created: string;
    modified: string;
    type: string;
    imageMetaData?: ImageMetaData;
    audioMetaData?: AudioMetaData;
  };
};

export type FileData = {
  // @ts-ignore
  key: string;
  [key: string]: FileBlock[]; // All the values are just strings
};

export async function fetchFiles(
  url: string,
  type: "audio" | "image" | "video"
): Promise<[FileData[] | null, string | null]> {
  const res = await fetch(`${url}/api/${type}`, { method: "GET" });

  if (!res.ok) {
    return [null, "failed to get files"];
  }

  const data = await res.json();

  if (!data?.data) {
    return [null, "failed to get files"];
  }

  return [data.data, null];
}
