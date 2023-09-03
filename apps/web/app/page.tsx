import { Button, Header, Heading } from "ui";

import { getClient } from "../lib/client";

import { gql } from "@apollo/client";

const query = gql`
  query ExampleQuery {
    books {
      title
    }
  }
`;

export const revalidate = 5;

export default async function Page() {
  const { data } = await getClient().query({ query });

  return (
    <>
      <Header text="Web" />
      <Button>shadcn button</Button>
      <Heading />
      <h1>{data.books[0].title}</h1>
    </>
  );
}
