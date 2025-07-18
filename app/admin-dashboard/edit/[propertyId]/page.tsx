import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getPropertyById } from "@/data/properties";
import {Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EditPropertyForm from "./edit-property-form";


export default async function EditProperty({params}: {
    params: Promise<any>
}) {
   const paramsValue = await params;
   
    const property = await getPropertyById(paramsValue.propertyId);
    console.log(property)
   return  <div>
      <Breadcrumbs 
        items={[{
                href: "/admin-dashboard",
                label: "Dashboard"
            },{
               label: "Edit Property"
            }
        ]}
      />
       
       <Card className="mt-5">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Edit Property
                </CardTitle>
                <CardContent>
                    <EditPropertyForm 
                      id={property.id}
                      address1={property.address1}
                      address2={property.address2}
                      city={property.city}
                      postcode={property.postcode}
                      bathrooms={property.bathrooms}
                      bedrooms={property.bedrooms}
                      price={property.price}
                      description={property.description}
                      status={property.status}
                    />
                </CardContent>
              </CardHeader>
        </Card>
      
   </div>
}