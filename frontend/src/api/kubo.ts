import { create } from 'kubo-rpc-client';

const client = create();

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const results = [];
  for (const file of files) {
    const { cid } = await client.add(file);
    results.push(cid.toString());
  }
  return results;
};

export default client;