import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type Customer = {
  CustomerID: number;
  CompanyName: string;
  ContactName: string;
};

export const loader = async ({ context }: LoaderArgs) => {
  const db = context.DB as D1Database;

  const { results } = await db
    .prepare("SELECT * FROM Customers")
    .all<Customer>();

  return json({
    customers: results ?? [],
  });
};

export default function Index() {
  const { customers } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.CustomerID}>{customer.CompanyName}</li>
        ))}
      </ul>
    </div>
  );
}
