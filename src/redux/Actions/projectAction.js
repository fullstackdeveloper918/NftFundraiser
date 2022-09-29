import axios from "axios";
import { Project_Success } from "../Slices/authProjectSlice";
export const ProjectFormData = (params) => async (dispatch) => {
  console.log("params", params);
  const token = "67|meccPZfMN9arrTih5dffpm6JRyohsyKmNL28UDog";
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //  "Access-Control-Allow-Origin": "*",
        //   crossDomain: true,
      },
    };
    const res = await axios.post(
      `https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/projects/store`,
      params,
      config
    );
    console.log("response", res);
    dispatch(Project_Success(res));
  } catch (e) {
    return console.error(e.message);
  }
};
