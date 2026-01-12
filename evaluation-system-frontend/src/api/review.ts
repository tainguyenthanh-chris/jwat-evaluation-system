import axiosInstance from "./axiosInstance";

// export async function getExamsByTypeAdmin({ type, sortBy, direction, page, size }) {
//   let url = `/admin/exams`;
//   const params = { type, sortBy, direction, page, size };
//   const response = await axiosInstance.get(url, { params });
//   const data = response.data;
//   return data;
// }

export const getTarget = async (payload: any) => {
    const res = await axiosInstance.post("/subm/target/old")
    return res.data;
     
}