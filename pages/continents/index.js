import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import { initializeApollo } from "../../apollo";

const QUERY = gql`
  query Continents($filter: ContinentFilterInput) {
    continents(filter: $filter) {
      code
      name
    }
  }
`;

export default function Continents() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      {data?.continents.map((c) => (
        <div key={c.code}>
          <Link style={{ display: "block" }} href={`/continents/${c.code}`}>
            {c.name}
          </Link>
        </div>
      ))}
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
