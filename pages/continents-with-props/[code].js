import { gql } from "@apollo/client";
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

export default function Continents({ continent }) {
  return (
    <div>
      <h1>{continent.name}</h1>
      <h1>Countries:</h1>
      <ul>
        {continent.countries.map((c) => (
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

  const { data } = await apolloClient.query({
    query: QUERY,
    variables: {
      code,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      continent: data.continent,
    },
  };
}
