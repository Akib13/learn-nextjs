import Link from "next/link";

function ClientPage() {

  const clients = [
    {id: "max", name: "maximilan"},
    {id: "manu", name: "manuel"},
  ];

  return (
    <div>
      <h1>The Client page.</h1>
      <ul>
        {/*<li>
            <Link href="/clients/max">Maximilan</Link>
          </li>
          <li>
            <Link href="/clients/manu">Manuel</Link>
    </li>*/}
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientPage;
