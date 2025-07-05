import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProperties } from "@/data/properties";



export default async function PropertiesTable() {
  // const {response, totalPages} = await getProperties();
   const {data, totalPages} = await getProperties({
     pagination: {
       pageSize: 2,
     }
   });
  // const data = response.data;
console.log({data, totalPages})
  console.log("RAW data:", data, "IsArray:", Array.isArray(data));

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">
        You have no properties
      </h1>
    );
  }

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Listing Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          const address = [
            property.address1,
            property.address2,
            property.city,
            property.postcode
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <TableRow key={property.id}>
              <TableCell>{address}</TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell>{property.status}</TableCell>
              <TableCell>View / Edit</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
