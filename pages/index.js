import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  if (!data) {
    redirect: {
      destination: "/no-data";
    }
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      //products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 10, //time after which the application re-generated
  };
}

export default HomePage;
