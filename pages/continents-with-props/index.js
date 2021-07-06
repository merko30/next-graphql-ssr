import { gql } from "@apollo/client";
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

export default function Continents({ continents }) {
  return (
    <div>
      {continents.map((c) => (
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

  const { data } = await apolloClient.query({
    query: QUERY,
  });

  return {
    props: {
      continents: data.continents,
    },
  };
}
