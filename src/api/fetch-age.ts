import { Age } from '../types';

export async function fetchAge(name: string): Promise<Age> {
  return fetch(`https://api.agify.io?name=${name}&country_id=RU`).then((response) =>
    response.json()
  );
}
