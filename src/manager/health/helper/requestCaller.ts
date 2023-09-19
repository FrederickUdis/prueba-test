import axios from "axios"

export async function checkServer(url: string): Promise<boolean>{
    try{
        const response = await axios.get(url)
        let now = new Date();
        let formatted_date = (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getFullYear() + " " 
                    + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        console.log(formatted_date);
        console.log(`Server ${url} status: ${response.status}`)
        return response.status === 200;
    }catch(error){
        return false
    }

}

export async function checkEndpoint(server: Function, service: Function, data: any, health = true): Promise<boolean> {
    if (await server()) {
        try {
            let response;
            if(service.length > 0) {
                response = await service(data, health);
            } else {
                response = await service(health);
            }
            console.log(`Endpoint ${service.name} status: ${response}`);
            return response === 200;
        } catch(err) {
            return false;
        }
    }
    return false;
}