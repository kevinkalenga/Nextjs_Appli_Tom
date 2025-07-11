"use client" 

import PropertyForm from "@/components/property-form";
import { auth } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = Property;

export default function EditPropertyForm({
        id,
        address1,
        address2,
        city,
        postcode,
        price,
        bedrooms,
        bathrooms,
        description,
        status,
}: Props) {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken();
      
         if(!token) {
             toast.error("You must be logged in to update a property.");
             return;
        }
         try {
             await updateProperty({ ...data, id }, token);
             toast.success("Property updated successfully!");
             router.push("/admin-dashboard");
         } catch (error) {
                console.error(error);
            toast.error("Failed to update property.");
         }
    }
    return <div>
        <PropertyForm 
            handleSubmit={handleSubmit} 
            submitButtonLabel={<><SaveIcon /> Save Property</>} 
            defaultValues={{
                  address1,
                  address2,
                  city,
                  postcode,
                  price,
                  bedrooms,
                  bathrooms,
                  description,
                  status,
            }}
            />
    </div>
}