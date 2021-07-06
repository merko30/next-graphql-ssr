import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";

const QUERY = gql`
  query Continents($filter: ContinentFilterInput) {
    continents(filter: $filter) {
      code
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error, refetch } = useQuery(QUERY);

  const onClick = () => {
    refetch({ filter: { code: { eq: "AF" } } });
  };

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      {data?.continents.map((c) => (
        <h4 key={c.code}>{c.name}</h4>
      ))}
      <button onClick={onClick}>refetch</button>
    </div>
  );
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
