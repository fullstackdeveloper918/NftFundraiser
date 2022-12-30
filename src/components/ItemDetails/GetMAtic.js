import axios from "axios";

export const GetMatic = async (setMatic) => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',

            },
        }
        // 
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=cad`,
            config
        )
        setMatic(res?.data)
        console.log('res', res)
    } catch (error) {
        // console.log("error");
    }
};