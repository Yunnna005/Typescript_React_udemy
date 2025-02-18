export async function get(url: string) {
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error();
  }

  const data = (await reponse.json()) as unknown;
  return data;
}
