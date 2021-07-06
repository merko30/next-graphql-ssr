import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";

const QUERY = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
