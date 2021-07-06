import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../apollo";

const QUERY = gql`
  query ContinentAndCountries($code: ID!) {
    continent(code: $code) {
      name
      countries {
        name
        code
      }
    }
  }
`;

export default function Continents({ code }) {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { code },
  });

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <h1>{data?.continent.name}</h1>
      <h1>Countries:</h1>
      <ul>
        {data?.continent.countries.map((c) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  const {
    params: { code },
  } = context;

  await apolloClient.query({
    query: QUERY,
    variables: {
      code,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      code,
    },
  };
}
