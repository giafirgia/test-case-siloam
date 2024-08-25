import { siloamHospitalsApi } from "@/lib/url-config";

async function getData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer ....",
      },
    };
  
    const response = fetch(
      siloamHospitalsApi,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  
    return response;
}
  
export default async function getAllProducts() {
    const data = await getData();
    return data;
}